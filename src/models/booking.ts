import { ApiProperty } from '@nestjs/swagger';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { OneToOne, Relation } from 'typeorm';
import { BookingType } from './booking-type';

@ObjectType()
export class Booking {
  @Field((type) => String)
  @ApiProperty()
  comment: string;

  @Field((type) => Int)
  @ApiProperty()
  id: number;

  @Field((type) => Float)
  @ApiProperty()
  value: number;

  @Field((type) => Int)
  @ApiProperty()
  fromId: number;

  @Field((type) => BookingType)
  @ApiProperty()
  @OneToOne(() => BookingType, (from) => from.id)
  from: Relation<BookingType>;

  @Field((type) => Int)
  @ApiProperty()
  toId: number;

  @Field((type) => BookingType)
  @ApiProperty()
  @OneToOne((type) => BookingType, (to) => to.id)
  to: Relation<BookingType>;
}
