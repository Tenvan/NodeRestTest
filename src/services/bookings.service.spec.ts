import { Test } from '@nestjs/testing';
import { databaseProviders } from '../database/database.providers';
import { bookingProvider } from '../models/booking.provider';
import { BookingService } from './bookings.service';

describe('BookingsService', () => {
  let bookingsService: BookingService;

  // beforeAll(() => {
  //   const { unit } = TestBed.create(BookingService)
  //     .mock(DatabaseService)
  //     .using({ getBookings: async () => mockBookings })
  //     .compile();

  //   bookingsService = unit;
  // });
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [BookingService, bookingProvider, ...databaseProviders],
    }).compile();

    bookingsService = moduleRef.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(bookingsService).toBeDefined();
  });

  describe('get data tests', () => {
    it('should get all bookings', async () => {
      const target = await bookingsService.findAll();
      expect(target.length).toBe(8);
    });

    it('should get booking for id', async () => {
      let target = await bookingsService.getForId(1);
      expect(target).not.toBeNull();
      expect(target!.id).toBe(1);

      target = await bookingsService.getForId(2);
      expect(target).not.toBeNull();
      expect(target!.id).toBe(2);
    });
  });
});
