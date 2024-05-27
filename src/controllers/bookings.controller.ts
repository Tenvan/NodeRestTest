import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookingService } from '../services/bookings.service';

@ApiTags('Bookings')
@Controller('Bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingService) {}

  @Get('getAll')
  async getAll() {
    return await this.bookingsService.findAll();
  }

  @Get('getForId/:id')
  async getForId(@Query('id') id: number) {
    return await this.bookingsService.getForId(id);
  }
}
