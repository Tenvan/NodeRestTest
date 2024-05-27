import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'booking-type' })
@ObjectType()
export class BookingType {
  @Column()
  @Field((type) => String)
  @ApiProperty()
  name!: string;

  @Column()
  @Field((type) => Int)
  @ApiProperty()
  number!: number;

  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  @ApiProperty()
  id!: number;
}
