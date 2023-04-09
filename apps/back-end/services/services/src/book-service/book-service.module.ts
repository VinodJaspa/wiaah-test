import { Module } from '@nestjs/common';
import { BookServiceService } from './book-service.service';
import { BookServiceResolver } from './book-service.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { BookServiceController } from './book-service.controller';
import { BookingRepository } from './repository';
import { BookingCommandHandlers } from './commands';
import { BookingQueryHandlers } from './queries';
import { BookingsEventHandlers } from './events';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: SERVICES.SHOPPING_CART_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.SHOPPING_CART_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.SHOPPING_CART_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [
    BookServiceResolver,
    BookServiceService,
    BookingRepository,
    ...BookingCommandHandlers,
    ...BookingQueryHandlers,
    ...BookingsEventHandlers,
  ],
  controllers: [BookServiceController],
})
export class BookServiceModule {}
