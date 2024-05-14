import { Injectable } from '@nestjs/common';
import { mockBookings, mockTypes } from '../../test/mock.data';

@Injectable()
export class DatabaseService {
  async getBookings() {
    return mockBookings;
  }

  async getBookingTypes() {
    return mockTypes;
  }
}
