import { Injectable } from '@nestjs/common';
import { filter, from, lastValueFrom, mergeMap } from 'rxjs';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class BookingsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async getForId(id: number) {
    const result = from(this.getAll()).pipe(
      mergeMap((bookings) => from(bookings)),
      filter((booking) => booking.id === id),
    );
    return lastValueFrom(result);
  }
  async getAll() {
    return this.databaseService.getBookings();
  }
}
