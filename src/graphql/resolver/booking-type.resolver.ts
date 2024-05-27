import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { BookingTypeService } from '../../services/booking-type.service';
import { BookingType } from '../../models/booking-type';

@Resolver((of: any) => BookingType)
export class BookingTypeResolver {
  constructor(private bookingTypeService: BookingTypeService) {}

  /**
   * Abfrage aller vorhandenen Buchungs Konten
   * @returns {BookingType[]}
   */
  @Query((returns) => [BookingType])
  async bookingTypes() {
    return this.bookingTypeService.getAll();
  }

  /**
   * Abfrage eines Buchungs Kontos anhand der ID
   * @param id
   * @returns
   */
  @Query((returns) => BookingType)
  async bookingType(@Args('id', { type: () => Int }) id: number) {
    return this.bookingTypeService.getForId(id);
  }
}
