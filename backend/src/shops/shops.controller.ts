import { Controller, Get, Param, Query } from '@nestjs/common';
import { ShopsService } from './shops.service';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '9',
  ) {
    return this.shopsService.findAll(+page, +limit);
  }

  @Get('categories')
  async getCategories() {
    return this.shopsService.getCategories();
  }

  @Get(':id/products')
  async getProducts(
    @Param('id') shopId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '12',
    @Query('categoryId') categoryId?: string,
  ) {
    return this.shopsService.getShopProducts(shopId, +page, +limit, categoryId);
  }
}
