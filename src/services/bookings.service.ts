import { Inject, Injectable } from '@nestjs/common';
import { from, lastValueFrom } from 'rxjs';
import { FindManyOptions, Repository } from 'typeorm';
import { Booking } from '../models/booking';
import { BOOKING_REPOSITORY } from '../models/booking.provider';

@Injectable()
export class BookingService {
  constructor(
    @Inject(BOOKING_REPOSITORY)
    private bookingRepository: Repository<Booking>,
  ) {}

  async getForId(id: number) {
    const result = from(this.bookingRepository.findOne({ where: { id } }));
    return lastValueFrom(result);
  }

  async findAll() {
    return this.bookingRepository.find();
  }

  async find(where: FindManyOptions<Booking>) {
    return this.bookingRepository.find(where);
  }
}
