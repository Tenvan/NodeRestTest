import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { mockBookings, mockTypes } from '../../test/mock.data';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get booking data', async () => {
    const target = await service.getBookings();
    expect(target.length).toBe(mockBookings.length);
  });

  it('should get booking type data', async () => {
    const target = await service.getBookingTypes();
    expect(target.length).toBe(mockTypes.length);
  });
});
