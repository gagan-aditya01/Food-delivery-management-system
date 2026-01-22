import { CartItem } from "./cart.model";

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  totalAmount: number;
  status:
    | "Placed"
    | "Preparing"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled";
  deliveryAddress: {
    address: string;
    city: string;
    postalCode: string;
  };
  createdAt: Date;
}
