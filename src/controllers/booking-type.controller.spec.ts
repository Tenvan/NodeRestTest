import { TestBed } from '@automock/jest';
import { Test, TestingModule } from '@nestjs/testing';
import { mockTypes, mockBookings } from '../../test/mock.data';
import { DatabaseService } from '../database/database.service';
import { BookingTypeService } from '../services/booking-type.service';
import { BookingTypeController } from './booking-type.controller';

describe('BookingTypeController', () => {
  let controller: BookingTypeController;
  let database: jest.Mocked<DatabaseService>;
  let bookingTypeService: BookingTypeService;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(BookingTypeService)
      .mock(DatabaseService)
      .using({
        getBookingTypes: async () => mockTypes,
        getBookings: async () => mockBookings,
      })
      .compile();

    bookingTypeService = unit;
    database = unitRef.get(DatabaseService);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingTypeController],
      providers: [
        {
          provide: BookingTypeService,
          useValue: bookingTypeService,
        },
        {
          provide: DatabaseService,
          useValue: database,
        },
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
      expect(target.length).toBe(4);
    });

    it('should get for id', async () => {
      let target = await controller.getForId(1);
      expect(target).not.toBeNull();
      expect(target.id).toBe(1);

      target = await controller.getForId(2);
      expect(target).not.toBeNull();
      expect(target.id).toBe(2);
    });
  });
});
