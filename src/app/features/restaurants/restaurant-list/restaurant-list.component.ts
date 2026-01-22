import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterLink } from "@angular/router";
import { RestaurantService } from "../../../core/services/restaurant.service";
import { Restaurant } from "../../../shared/models/restaurant.model";

@Component({
  selector: "app-restaurant-list",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, RouterLink],
  templateUrl: "./restaurant-list.component.html",
  styleUrls: ["./restaurant-list.component.scss"],
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  isLoading = true;
  errorMessage = "";

  constructor(private readonly restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe({
      next: (data) => {
        this.restaurants = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = "Unable to load restaurants. Please try again.";
        this.isLoading = false;
      },
    });
  }
}
