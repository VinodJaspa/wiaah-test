import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES, KAFKA_BROKERS } from 'nest-utils';
import { AffiliationResolver } from './affiliation.resolver';
import { AffiliationCommandHandlers } from './commands';
import { affiliationQueryHandlers } from './queries';
import { AffiliationRepository } from './repository';

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
    AffiliationResolver,
    AffiliationRepository,
    ...affiliationQueryHandlers,
    ...AffiliationCommandHandlers,
  ],
})
export class AffiliationModule {}
