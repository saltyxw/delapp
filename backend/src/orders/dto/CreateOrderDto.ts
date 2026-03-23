import { IsEmail } from 'class-validator';

export class OrderItemDto {
  productId: string;

  quantity: number;

  priceAtPurchase: number;
}

export class CreateOrderDto {
  userName: string;
  @IsEmail()
  userEmail: string;
  userAdress: string;
  userPhone: string;
  totalPrice: number;
  couponCode?: string;
  shopId: string;
  items: OrderItemDto[];
}
