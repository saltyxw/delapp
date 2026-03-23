import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopsModule } from './shops/shops.module';
import { OrdersModule } from './orders/orders.module';
import { CouponsModule } from './coupons/coupons.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ShopsModule, OrdersModule, CouponsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
