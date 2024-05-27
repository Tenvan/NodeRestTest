import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { bookingTypeProvider } from './booking-type.provider';
import { BookingTypeService } from '../services/booking-type.service';

@Module({
  imports: [DatabaseModule],
  providers: [bookingTypeProvider, BookingTypeService],
  exports: [BookingTypeService],
})
export class BookingTypeModule {}
