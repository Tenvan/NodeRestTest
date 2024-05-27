import { Booking } from '../models/booking';
import { BookingType } from '../models/booking-type';
import { DataSource } from 'typeorm';

export const DATASOURCE_PROVIDER = 'DATA_SOURCE';

export const databaseProviders = [
  {
    provide: DATASOURCE_PROVIDER,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: 'data/booking.sqlite',
        synchronize: false,
        entities: [Booking, BookingType],
      });

      return dataSource.initialize();
    },
  },
];
