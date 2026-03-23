import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShopsService {
  constructor(private prisma: PrismaService) {}
  async findAll(page: number = 1, limit: number = 9) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.shop.findMany({
        skip: skip,
        take: limit,
        orderBy: { rating: 'desc' },
      }),
      this.prisma.shop.count(),
    ]);

    return {
      items,
      meta: { total, page, lastPage: Math.ceil(total / limit) },
    };
  }

  async getShopProducts(
    shopId: string,
    page: number = 1,
    limit: number = 12,
    categoryId?: string,
  ) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where: {
          shopId: shopId,
          ...(categoryId && { categoryId }),
        },
        skip: skip,
        take: limit,
        include: {
          category: true,
        },
      }),
      this.prisma.product.count({
        where: {
          shopId: shopId,
          ...(categoryId && { categoryId }),
        },
      }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async getCategories() {
    return this.prisma.category.findMany();
  }
}
