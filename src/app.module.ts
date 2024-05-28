import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BookingTypeController } from './controllers/booking-type.controller';
import { BookingsController } from './controllers/bookings.controller';
import { BookingTypeResolver } from './graphql/resolver/booking-type.resolver';
import { BookingResolver } from './graphql/resolver/booking.resolver';
import { BookingTypeModule } from './models/booking-type.module';
import { BookingModule } from './models/booking.module';
import { EventController } from './controllers/EventController';

@Module({
  imports: [
    /**
     * Apollo GraphQL
     */
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
    BookingTypeModule,
    BookingModule,
  ],
  controllers: [BookingTypeController, BookingsController, EventController],
  providers: [BookingResolver, BookingTypeResolver],
})
export class AppModule {}
