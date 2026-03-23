import { Controller, Get, Query } from '@nestjs/common';
import { CouponsService } from './coupons.service';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get()
  async findAll() {
    return this.couponsService.findAll();
  }

  @Get('validate')
  async validate(@Query('code') code: string) {
    return this.couponsService.validate(code);
  }
}
