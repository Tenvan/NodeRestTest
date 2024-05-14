import { TestBed } from '@automock/jest';
import { mockTypes } from '../../test/mock.data';
import { DatabaseService } from '../database/database.service';
import { BookingTypeService } from './booking-type.service';

describe('BookingTypeService', () => {
  let bookingTypeService: BookingTypeService;

  beforeAll(() => {
    const { unit } = TestBed.create(BookingTypeService)
      .mock(DatabaseService)
      .using({ getBookingTypes: async () => mockTypes })
      .compile();

    bookingTypeService = unit;
  });

  it('should be defined', () => {
    expect(bookingTypeService).toBeDefined();
  });

  describe('get data tests', () => {
    it('should get all types', async () => {
      const target = await bookingTypeService.getAll();
      expect(target.length).toBe(4);
    });

    it('should get for id', async () => {
      let target = await bookingTypeService.getForId(1);

      expect(target).not.toBeNull();
      expect(target.id).toBe(1);

      target = await bookingTypeService.getForId(2);
      expect(target).not.toBeNull();
      expect(target.id).toBe(2);
    });
  });
});
