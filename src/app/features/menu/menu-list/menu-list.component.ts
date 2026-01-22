import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CartService } from "../../../core/services/cart.service";
import { MenuService } from "../../../core/services/menu.service";
import { RestaurantService } from "../../../core/services/restaurant.service";
import { MenuItem } from "../../../shared/models/menu-item.model";
import { Restaurant } from "../../../shared/models/restaurant.model";

@Component({
  selector: "app-menu-list",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  templateUrl: "./menu-list.component.html",
  styleUrls: ["./menu-list.component.scss"],
})
export class MenuListComponent implements OnInit {
  restaurant: Restaurant | null = null;
  menuItems: MenuItem[] = [];
  isLoading = true;
  errorMessage = "";

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cartService: CartService,
    private readonly restaurantService: RestaurantService,
    private readonly menuService: MenuService,
  ) {}

  ngOnInit(): void {
    const restaurantId = Number(
      this.route.snapshot.paramMap.get("restaurantId"),
    );

    if (!restaurantId) {
      this.errorMessage = "Invalid restaurant selection.";
      this.isLoading = false;
      return;
    }

    this.restaurantService.getRestaurants().subscribe({
      next: (restaurants) => {
        this.restaurant =
          restaurants.find((r) => r.id === restaurantId) ?? null;
      },
      error: () => {
        this.errorMessage = "Unable to load restaurant details.";
      },
    });

    this.menuService.getMenuItems().subscribe({
      next: (items) => {
        this.menuItems = items.filter(
          (item) => item.restaurantId === restaurantId,
        );
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = "Unable to load menu items.";
        this.isLoading = false;
      },
    });
  }

  addToCart(item: MenuItem): void {
    this.cartService.addItem(item);
  }
}
