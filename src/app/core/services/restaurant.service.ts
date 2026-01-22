import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Restaurant } from "../../shared/models/restaurant.model";

@Injectable({
  providedIn: "root",
})
export class RestaurantService {
  private readonly dataUrl = "assets/mock-data/restaurants.json";

  constructor(private readonly http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.dataUrl);
  }
}
