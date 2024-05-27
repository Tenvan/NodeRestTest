import { DataSource } from 'typeorm';
import { Booking } from './booking';
import { DATASOURCE_PROVIDER } from '../database/database.providers';

export const BOOKING_REPOSITORY = 'BOOKING_REPOSITORY';

export const bookingProvider = {
  provide: BOOKING_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Booking),
  inject: [DATASOURCE_PROVIDER],
};
