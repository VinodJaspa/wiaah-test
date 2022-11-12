import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { membershipCommandHandlers } from './commands';
import { MembershipResolver } from './membership.resolver';
import { membershipQueryHandlers } from './queries';
import { MembershipRepository } from './repository';
import { exntededResolvers } from './extendedResolvers';
import { MembershipController } from './membership.controller';
import { membershipEventHandlers } from './events';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: SERVICES.MEMBERSHIP.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: SERVICES.MEMBERSHIP.clientId,
            brokers: KAFKA_BROKERS,
          },
        },
      },
    ]),
  ],
  providers: [
    MembershipResolver,
    MembershipRepository,
    ...exntededResolvers,
    ...membershipCommandHandlers,
    ...membershipQueryHandlers,
    ...membershipEventHandlers,
  ],
  controllers: [MembershipController],
})
export class MembershipModule {}
