import { Inject, Injectable } from '@nestjs/common';
import type { Repository } from 'typeorm';
import type { BookingType } from '../models/booking-type';
import { BOOKING_TYPE_REPOSITORY } from '../models/booking-type.provider';

@Injectable()
export class BookingTypeService {
  constructor(
    @Inject(BOOKING_TYPE_REPOSITORY)
    private readonly bookingTypeRepository: Repository<BookingType>,
  ) {}

  async getForId(id: number) {
    const result = this.bookingTypeRepository.findOne({ where: { id } });
    return result;
  }

  async getAll() {
    const result = await this.bookingTypeRepository.find();
    return result;
  }
}
