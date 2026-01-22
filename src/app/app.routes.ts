import { Routes } from "@angular/router";
import { MenuListComponent } from "./features/menu/menu-list/menu-list.component";
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
    path: "**",
    redirectTo: "restaurants",
  },
];
