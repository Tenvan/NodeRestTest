import { Test, TestingModule } from '@nestjs/testing';
import { databaseProviders } from '../database/database.providers';
import { bookingProvider } from '../models/booking.provider';
import { BookingService } from '../services/bookings.service';
import { BookingsController } from './bookings.controller';

describe('BookingsController', () => {
  let controller: BookingsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [BookingService, bookingProvider, ...databaseProviders],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get data tests', () => {
    it('get all data', async () => {
      expect((await controller.getAll()).length).toBe(8);
    });

    it('should get for id', async () => {
      let target = await controller.getForId(1);
      expect(target).not.toBeNull();
      expect(target?.id).toBe(1);

      target = await controller.getForId(2);
      expect(target).not.toBeNull();
      expect(target?.id).toBe(2);
    });
  });
});
