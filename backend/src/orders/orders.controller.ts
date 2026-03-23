import { Body, Controller, Get, Post, Query, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/CreateOrderDto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Get('history')
  async getHistory(
    @Query('email') email: string,
    @Query('phone') phone: string,
  ) {
    return this.ordersService.getHistory(email, phone);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ordersService.getOne(id);
  }
}
