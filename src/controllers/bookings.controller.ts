import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookingsService } from '../services/bookings.service';

@ApiTags('Bookings')
@Controller('Bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get('getAll')
  async getAll() {
    return await this.bookingsService.getAll();
  }

  @Get('getForId/:id')
  async getForId(@Query('id') id: number) {
    return await this.bookingsService.getForId(id);
  }
}
