import { Injectable } from "@angular/core";
import { BehaviorSubject, interval, Subscription } from "rxjs";
import { Order } from "../../shared/models/order.model";

const STATUS_FLOW: Order["status"][] = [
  "Placed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private readonly orderSubject = new BehaviorSubject<Order | null>(null);
  readonly order$ = this.orderSubject.asObservable();

  private statusSubscription?: Subscription;

  placeOrder(order: Order): void {
    this.orderSubject.next(order);
    this.startStatusSimulation();
  }

  clearOrder(): void {
    this.orderSubject.next(null);
    this.statusSubscription?.unsubscribe();
  }

  private startStatusSimulation(): void {
    this.statusSubscription?.unsubscribe();

    let stepIndex = 0;
    this.statusSubscription = interval(4000).subscribe(() => {
      const current = this.orderSubject.value;
      if (!current) {
        return;
      }

      stepIndex = Math.min(stepIndex + 1, STATUS_FLOW.length - 1);
      const nextStatus = STATUS_FLOW[stepIndex];

      this.orderSubject.next({
        ...current,
        status: nextStatus,
      });

      if (nextStatus === "Delivered") {
        this.statusSubscription?.unsubscribe();
      }
    });
  }
}
