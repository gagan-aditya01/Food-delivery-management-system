import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { RouterLink } from "@angular/router";
import { CartService } from "../../core/services/cart.service";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent {
  items$ = this.cartService.items$;
  total$ = this.cartService.total$;

  constructor(private readonly cartService: CartService) {}

  increase(itemId: number, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity + 1);
  }

  decrease(itemId: number, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity - 1);
  }

  remove(itemId: number): void {
    this.cartService.removeItem(itemId);
  }

  clear(): void {
    this.cartService.clearCart();
  }
}
