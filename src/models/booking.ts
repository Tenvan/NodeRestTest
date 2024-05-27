import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingType } from './booking-type';

@Entity('bookings')
@ObjectType()
export class Booking {
  @Column({ nullable: true })
  @Field((type) => String)
  @ApiProperty()
  comment?: string;

  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  @ApiProperty()
  id!: number;

  @Column()
  @Field((type) => Float)
  @ApiProperty()
  value!: number;

  @Column()
  @Field((type) => BookingType)
  @ApiProperty()
  from!: number;

  @Column()
  @Field((type) => BookingType)
  @ApiProperty()
  to!: number;
}
