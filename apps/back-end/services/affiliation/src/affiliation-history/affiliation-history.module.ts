import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES, KAFKA_BROKERS } from 'nest-utils';
import { AffiliationHistoryResolver } from './affiliation-history.resolver';
import { AffiliationPurchaseController } from './affiliation-purchase.controller';
import { AffiliationPurchaseCommandHandlers } from './commands';
import { affiliationPurchaseQueryHandlers } from './queries';
import { AffiliationPurchaseRepository } from './repository';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: SERVICES.AFFILIATION_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.AFFILIATION_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.AFFILIATION_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [
    AffiliationHistoryResolver,
    AffiliationPurchaseRepository,
    ...affiliationPurchaseQueryHandlers,
    ...AffiliationPurchaseCommandHandlers,
  ],
  controllers: [AffiliationPurchaseController],
})
export class AffiliationHistoryModule {}
