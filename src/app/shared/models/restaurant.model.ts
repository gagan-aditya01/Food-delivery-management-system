export interface Restaurant {
  id: number;
  name: string;
  cuisineType: string;
  rating: number;
  deliveryTime: string; // e.g., "30-40 min"
  priceRange: string; // e.g., "$$"
  imageUrl: string;
}
