import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { CartService } from "./core/services/cart.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatBadgeModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "food-delivery-management-system";

  cartCount$ = this.cartService.itemCount$;

  constructor(private readonly cartService: CartService) {}
}
