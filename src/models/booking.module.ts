import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BookingService } from '../services/bookings.service';
import { bookingProvider } from './booking.provider';

@Module({
  imports: [DatabaseModule],
  providers: [bookingProvider, BookingService],
  exports: [BookingService],
})
export class BookingModule {}
