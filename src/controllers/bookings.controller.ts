import { Controller, Get, Query, Sse } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { interval, map, takeWhile, type Observable } from 'rxjs';
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

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(100).pipe(
      map(
        (value) =>
          ({ data: { hello: `world: ${value}`, value } }) as MessageEvent,
      ),
      takeWhile((ApiTags) => ApiTags.data.value < 10),
    );
  }
}
