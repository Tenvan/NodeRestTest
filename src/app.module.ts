import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BookingTypeController } from './controllers/booking-type.controller';
import { BookingsController } from './controllers/bookings.controller';
import { BookingTypeResolver } from './graphql/resolver/booking-type.resolver';
import { BookingResolver } from './graphql/resolver/booking.resolver';
import { BookingTypeService } from './services/booking-type.service';
import { BookingsService } from './services/bookings.service';
import { DatabaseService } from './database/database.service';

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
  ],
  controllers: [BookingTypeController, BookingsController],
  providers: [
    BookingTypeService,
    BookingsService,
    BookingResolver,
    BookingTypeResolver,
    DatabaseService,
  ],
})
export class AppModule {}
