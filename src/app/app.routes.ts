import { Routes } from "@angular/router";
import { CartComponent } from "./features/cart/cart.component";
import { CheckoutComponent } from "./features/checkout/checkout.component";
import { MenuListComponent } from "./features/menu/menu-list/menu-list.component";
import { OrderStatusComponent } from "./features/orders/order-status/order-status.component";
import { RestaurantListComponent } from "./features/restaurants/restaurant-list/restaurant-list.component";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "restaurants",
  },
  {
    path: "restaurants",
    component: RestaurantListComponent,
  },
  {
    path: "menu/:restaurantId",
    component: MenuListComponent,
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "checkout",
    component: CheckoutComponent,
  },
  {
    path: "order-status",
    component: OrderStatusComponent,
  },
  {
    path: "**",
    redirectTo: "restaurants",
  },
];
