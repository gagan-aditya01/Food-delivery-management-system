import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from "@angular/material/divider";
import { RouterLink } from "@angular/router";
import { OrderService } from "../../../core/services/order.service";
import { Order } from "../../../shared/models/order.model";

@Component({
  selector: "app-order-status",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
  ],
  templateUrl: "./order-status.component.html",
  styleUrls: ["./order-status.component.scss"],
})
export class OrderStatusComponent {
  readonly order$ = this.orderService.order$;
  readonly steps: Order["status"][] = [
    "Placed",
    "Preparing",
    "Out for Delivery",
    "Delivered",
  ];

  constructor(private readonly orderService: OrderService) {}

  getStepIndex(status: Order["status"]): number {
    return this.steps.indexOf(status);
  }
}
