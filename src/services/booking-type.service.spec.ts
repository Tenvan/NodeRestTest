import { Test } from '@nestjs/testing';
import { databaseProviders } from '../database/database.providers';
import { bookingTypeProvider } from '../models/booking-type.provider';
import { BookingTypeService } from './booking-type.service';

describe('BookingTypeService', () => {
  let bookingTypeService: BookingTypeService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BookingTypeService,
        bookingTypeProvider,
        ...databaseProviders,
      ],
    }).compile();

    bookingTypeService = moduleRef.get<BookingTypeService>(BookingTypeService);
  });

  it('should be defined', () => {
    expect(bookingTypeService).toBeDefined();
  });

  describe('get data tests', () => {
    it('should get all types', async () => {
      const target = await bookingTypeService.getAll();
      expect(target).not.toBeNull();
      expect(target.length).toBe(7);
    });

    it('should get for id', async () => {
      let target = await bookingTypeService.getForId(1);

      expect(target).not.toBeNull();
      expect(target!.id).toBe(1);

      target = await bookingTypeService.getForId(2);
      expect(target).not.toBeNull();
      expect(target!.id).toBe(2);
    });
  });
});
