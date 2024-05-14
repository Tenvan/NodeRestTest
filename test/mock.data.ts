import { Booking } from '../src/models/booking';
import { BookingType } from '../src/models/booking-type';

export const mockBookings = <Booking[]>[
  {
    id: 1,
    fromId: 1,
    toId: 2,
    value: 1000,
    comment: 'Booking 1',
  },
  {
    id: 2,
    fromId: 3,
    toId: 4,
    value: 1999.99,
    comment: 'Booking 2',
  },
  {
    id: 3,
    fromId: 1,
    toId: 3,
    value: 999.99,
    comment: 'Booking 3',
  },
];

export const mockTypes = <BookingType[]>[
  {
    id: 1,
    number: 1,
    name: 'Booking Type 1',
  },
  {
    id: 2,
    number: 2,
    name: 'Booking Type 2',
  },
  {
    id: 3,
    number: 3,
    name: 'Booking Type 3',
  },
  {
    id: 4,
    number: 4,
    name: 'Booking Type 4',
  },
];
