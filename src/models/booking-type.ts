import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Entity } from 'typeorm';

@Entity()
@ObjectType()
export class BookingType {
  @Field((type) => String)
  @ApiProperty()
  name!: string;

  @Field((type) => Int)
  @ApiProperty()
  number!: number;

  @Field((type) => Int)
  @ApiProperty()
  id!: number;
}
