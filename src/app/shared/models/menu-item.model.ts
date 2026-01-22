export interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  category: string;
  isVeg: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  imageUrl?: string;
}
