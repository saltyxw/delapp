export type OrderItem = {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  product?: {
    name: string;
    shopId: string;
    imageUrl: string | null;
    category?: {
      id: string;
      name: string;
    } | null;
  };
};

export interface ICreateOrder {
  userName: string;
  userEmail: string;
  userAdress: string;
  userPhone: string;
  totalPrice: number;
  shopId: string;
  items: OrderItem[];
}

export interface OrderHistoryResponse {
  id: string;
  createdAt: string;
  totalPrice: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAdress: string;
  orderItems: OrderItem[];
}
