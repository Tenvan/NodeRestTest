import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookingTypeService } from '../services/booking-type.service';

@ApiTags('Booking')
@Controller('BookingTypes')
export class BookingTypeController {
  constructor(private readonly bookingTypeService: BookingTypeService) {}

  @Get('GetAllBookings')
  getAll() {
    return this.bookingTypeService.getAll();
  }

  @Get('getForId/:id')
  getForId(@Query('id') id: number) {
    return this.bookingTypeService.getForId(id);
  }
}
