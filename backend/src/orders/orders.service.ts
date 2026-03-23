import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/CreateOrderDto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items, ...orderData } = createOrderDto;
    return this.prisma.order.create({
      data: {
        userName: orderData.userName,
        userEmail: orderData.userEmail,
        userPhone: orderData.userPhone,
        userAdress: orderData.userAdress,
        totalPrice: orderData.totalPrice,
        shopId: orderData.shopId,
        orderItems: {
          create: items.map((item) => ({
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase,
            productId: item.productId,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });
  }

  async getOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        shop: true,
        orderItems: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });
  }

  async getHistory(email: string, phone: string) {
    const orders = await this.prisma.order.findMany({
      where: {
        userEmail: email.trim(),
        userPhone: phone.trim(),
      },
      include: {
        shop: true,
        orderItems: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });
    return orders;
  }
}
