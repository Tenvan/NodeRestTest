import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { BookingType } from 'src/models/booking-type';
import { BookingTypeService } from '../../services/booking-type.service';

@Resolver((of: any) => BookingType)
export class BookingTypeResolver {
  constructor(private bookingTypeService: BookingTypeService) {}

  @Query((returns) => BookingType)
  async bookingType(@Args('id', { type: () => Int }) id: number) {
    return this.bookingTypeService.getForId(id);
  }
}
