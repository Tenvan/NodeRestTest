import { TestBed } from '@automock/jest';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service';
import { mockBookings, mockTypes } from '../../test/mock.data';
import { BookingsService } from '../services/bookings.service';
import { BookingsController } from './bookings.controller';

describe('BookingsController', () => {
  let controller: BookingsController;
  let bookingsService: BookingsService;
  let database: jest.Mocked<DatabaseService>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(BookingsService)
      .mock(DatabaseService)
      .using({
        getBookingTypes: async () => mockTypes,
        getBookings: async () => mockBookings,
      })
      .compile();

    bookingsService = unit;
    database = unitRef.get(DatabaseService);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [
        {
          provide: BookingsService,
          useValue: bookingsService,
        },
        {
          provide: DatabaseService,
          useValue: database,
        },
      ],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get data tests', () => {
    it('get all data', async () => {
      expect((await controller.getAll()).length).toBe(2);
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
