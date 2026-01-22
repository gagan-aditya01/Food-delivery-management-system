import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Router, RouterLink } from "@angular/router";
import { combineLatest, firstValueFrom, map } from "rxjs";
import { CartService } from "../../core/services/cart.service";
import { OrderService } from "../../core/services/order.service";
import { Order } from "../../shared/models/order.model";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule,
  ],
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent {
  readonly deliveryFee = 40;
  readonly taxRate = 0.05;

  readonly items$ = this.cartService.items$;
  readonly total$ = this.cartService.total$;

  readonly summary$ = combineLatest([this.items$, this.total$]).pipe(
    map(([items, subtotal]) => {
      const tax = Math.round(subtotal * this.taxRate);
      const grandTotal = subtotal + tax + (items.length ? this.deliveryFee : 0);
      return {
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
        subtotal,
        tax,
        deliveryFee: items.length ? this.deliveryFee : 0,
        grandTotal,
      };
    }),
  );

  readonly form = this.formBuilder.group({
    name: ["", [Validators.required, Validators.minLength(2)]],
    phone: ["", [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    email: ["", [Validators.required, Validators.email]],
    address: ["", [Validators.required, Validators.minLength(5)]],
    city: ["", [Validators.required]],
    postalCode: ["", [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)]],
    paymentMethod: ["cod", [Validators.required]],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cartService: CartService,
    private readonly orderService: OrderService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const items = await firstValueFrom(this.items$);
    const summary = await firstValueFrom(this.summary$);

    if (!items.length) {
      this.snackBar.open("Your cart is empty.", "Dismiss", {
        duration: 2500,
      });
      return;
    }

    const order: Order = {
      id: Date.now(),
      items,
      subtotal: summary.subtotal,
      tax: summary.tax,
      deliveryFee: summary.deliveryFee,
      totalAmount: summary.grandTotal,
      status: "Placed",
      customer: {
        name: this.form.value.name ?? "",
        phone: this.form.value.phone ?? "",
        email: this.form.value.email ?? "",
      },
      deliveryAddress: {
        address: this.form.value.address ?? "",
        city: this.form.value.city ?? "",
        postalCode: this.form.value.postalCode ?? "",
      },
      paymentMethod: (this.form.value.paymentMethod ?? "cod") as
        | "cod"
        | "card"
        | "upi",
      createdAt: new Date(),
    };

    this.orderService.placeOrder(order);

    this.cartService.clearCart();
    this.snackBar.open("Order placed successfully!", "Dismiss", {
      duration: 3000,
    });
    this.router.navigate(["/order-status"]);
  }
}
