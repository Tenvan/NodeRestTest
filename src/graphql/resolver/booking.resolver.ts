import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Booking } from '../../models/booking';
import { BookingsService } from 'src/services/bookings.service';
import { BookingTypeService } from '../../services/booking-type.service';
import { BookingType } from 'src/models/booking-type';

@Resolver((of: any) => Booking)
export class BookingResolver {
  constructor(
    private bookingsService: BookingsService,
    private bookingTypeService: BookingTypeService,
  ) {}

  @Query((returns) => Booking)
  async booking(@Args('id', { type: () => Int }) id: number) {
    return this.bookingsService.getForId(id);
  }

  /**
   * Abfrage aller vorhandenen Buchungen
   * @returns {Booking[]}
   */
  @Query((returns) => [Booking])
  async bookings() {
    return this.bookingsService.getAll();
  }

  @ResolveField()
  async from(@Parent() booking: Booking) {
    return this.bookingTypeService.getForId(booking.from as number);
  }

  @ResolveField()
  async to(@Parent() booking: Booking) {
    return this.bookingTypeService.getForId(booking.to as number);
  }
}
