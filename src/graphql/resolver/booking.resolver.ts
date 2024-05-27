import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { BookingService } from 'src/services/bookings.service';
import { FindManyOptions } from 'typeorm';
import { Booking } from '../../models/booking';
import { BookingTypeService } from '../../services/booking-type.service';

@Resolver((of: any) => Booking)
export class BookingResolver {
  constructor(
    private bookingsService: BookingService,
    private bookingTypeService: BookingTypeService,
  ) {}

  /**
   * Abfrage einer Buchung anhand der ID
   * @param id
   * @returns
   */
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
    return this.bookingsService.findAll();
  }

  @Query((returns) => [Booking])
  async bookingsWhere(
    @Args('where', {
      type: () => {
        return GraphQLJSONObject;
      },
      nullable: true,
    })
    where: FindManyOptions<Booking>,
  ) {
    // where = { where: { id: { $gte: 2 } }, order: { id: 'DESC' } } as any;
    where = { where: { id: { $gte: 2 } }, order: { id: 'DESC' } } as any;
    return this.bookingsService.find(where);
  }

  @ResolveField()
  async from(@Parent() booking: Booking) {
    return await this.bookingTypeService.getForId(booking?.from as number);
  }

  @ResolveField()
  async to(@Parent() booking: Booking) {
    // return this.bookingTypeService.getForId(booking?.to as number);
    return await this.bookingTypeService.getForId(booking?.to as number);
  }
}
