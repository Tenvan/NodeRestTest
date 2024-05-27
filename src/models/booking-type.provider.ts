import { DataSource } from 'typeorm';
import { BookingType } from './booking-type';
import { DATASOURCE_PROVIDER } from '../database/database.providers';

export const BOOKING_TYPE_REPOSITORY = 'BOOKINGTYPE_REPOSITORY';

export const bookingTypeProvider = {
  provide: BOOKING_TYPE_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(BookingType),
  inject: [DATASOURCE_PROVIDER],
};
