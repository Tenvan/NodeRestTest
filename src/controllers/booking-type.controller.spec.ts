import { Test, TestingModule } from '@nestjs/testing';
import { BookingTypeService } from '../services/booking-type.service';
import { BookingTypeController } from './booking-type.controller';
import { bookingTypeProvider } from '../models/booking-type.provider';
import { databaseProviders } from '../database/database.providers';

describe('BookingTypeController', () => {
  let controller: BookingTypeController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingTypeController],
      providers: [
        BookingTypeService,
        bookingTypeProvider,
        ...databaseProviders,
      ],
    }).compile();

    controller = module.get<BookingTypeController>(BookingTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get data tests', () => {
    it('get all data', async () => {
      const target = await controller.getAll();
      expect(target.length).toBe(7);
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
