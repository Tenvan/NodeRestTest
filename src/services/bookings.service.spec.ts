import { TestBed } from '@automock/jest';
import { DatabaseService } from '../database/database.service';
import { BookingsService } from './bookings.service';
import { mockBookings } from '../../test/mock.data';

describe('BookingsService', () => {
  let bookingsService: BookingsService;

  beforeAll(() => {
    const { unit } = TestBed.create(BookingsService)
      .mock(DatabaseService)
      .using({ getBookings: async () => mockBookings })
      .compile();

    bookingsService = unit;
  });

  it('should be defined', () => {
    expect(bookingsService).toBeDefined();
  });

  describe('get data tests', () => {
    it('should get all bookings', async () => {
      const target = await bookingsService.getAll();
      expect(target.length).toBe(2);
    });

    it('should get booking for id', async () => {
      let target = await bookingsService.getForId(1);
      expect(target).not.toBeNull();
      expect(target.id).toBe(1);

      target = await bookingsService.getForId(2);
      expect(target).not.toBeNull();
      expect(target.id).toBe(2);
    });
  });
});
