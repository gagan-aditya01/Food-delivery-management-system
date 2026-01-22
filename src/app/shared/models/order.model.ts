import { CartItem } from "./cart.model";

export interface Order {
  id: number;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  totalAmount: number;
  status:
    | "Placed"
    | "Preparing"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled";
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  deliveryAddress: {
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: "cod" | "card" | "upi";
  createdAt: Date;
}
