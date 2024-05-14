import { ApiProperty } from '@nestjs/swagger';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Entity, OneToOne, Relation } from 'typeorm';
import { BookingType } from './booking-type';

@Entity()
@ObjectType()
export class Booking {
  @Field((type) => String)
  @ApiProperty()
  comment?: string;

  @Field((type) => Int)
  @ApiProperty()
  id!: number;

  @Field((type) => Float)
  @ApiProperty()
  value!: number;

  @Field((type) => BookingType)
  @ApiProperty()
  @OneToOne(() => BookingType, (bookingType) => bookingType.id)
  from!: number | BookingType;

  @Field((type) => BookingType)
  @ApiProperty()
  @OneToOne((type) => BookingType, (to) => to.id)
  to!: number | BookingType;
}
