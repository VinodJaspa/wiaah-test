import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsResolver } from './accounts.resolver';
import { PrismaService } from 'prismaService';
import { AccountsController } from './accounts.controller';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountRepository } from './repository';
import { accountCommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountEventHandlers } from './events';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: SERVICES.ACCOUNTS_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.ACCOUNTS_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.ACCOUNTS_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [
    AccountsResolver,
    AccountsService,
    PrismaService,
    AccountRepository,
    ...accountCommandHandlers,
    ...AccountEventHandlers,
  ],
  controllers: [AccountsController],
})
export class AccountsModule {}
