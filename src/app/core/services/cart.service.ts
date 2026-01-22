import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { CartItem } from "../../shared/models/cart.model";
import { MenuItem } from "../../shared/models/menu-item.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>([]);
  readonly items$ = this.itemsSubject.asObservable();

  readonly itemCount$ = this.items$.pipe(
    map((items) => items.reduce((total, item) => total + item.quantity, 0)),
  );

  readonly total$ = this.items$.pipe(
    map((items) =>
      items.reduce(
        (total, item) => total + item.menuItem.price * item.quantity,
        0,
      ),
    ),
  );

  addItem(menuItem: MenuItem): void {
    const items = [...this.itemsSubject.value];
    const existing = items.find((item) => item.menuItem.id === menuItem.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ menuItem, quantity: 1 });
    }

    this.itemsSubject.next(items);
  }

  updateQuantity(menuItemId: number, quantity: number): void {
    const items = this.itemsSubject.value
      .map((item) =>
        item.menuItem.id === menuItemId ? { ...item, quantity } : item,
      )
      .filter((item) => item.quantity > 0);

    this.itemsSubject.next(items);
  }

  removeItem(menuItemId: number): void {
    const items = this.itemsSubject.value.filter(
      (item) => item.menuItem.id !== menuItemId,
    );
    this.itemsSubject.next(items);
  }

  clearCart(): void {
    this.itemsSubject.next([]);
  }
}
