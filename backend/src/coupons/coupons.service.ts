import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CouponsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.coupon.findMany();
  }

  async validate(code: string) {
    const coupon = await this.prisma.coupon.findUnique({
      where: {
        code: code.toUpperCase(),
      },
    });

    if (!coupon) {
      return {
        valid: false,
        discountValue: 0,
        message: 'not found',
      };
    }

    if (coupon.expiryDate && new Date() > coupon.expiryDate) {
      return {
        valid: false,
        discountValue: 0,
        message: 'expired',
      };
    }

    return {
      valid: true,
      discountValue: coupon.discount,
      message: 'applied',
    };
  }
}
