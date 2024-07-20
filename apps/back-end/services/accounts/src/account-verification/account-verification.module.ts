import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { AccountVerificationResolver } from './account-verification.resolver';
import { accVerificationCommandHandlers } from './commands';
import { accVerificationQueryHandlers } from './queries';
import { AccountVerificationRepository } from './repository';

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
    PrismaService,
    AccountVerificationResolver,
    AccountVerificationRepository,
    ...accVerificationCommandHandlers,
    ...accVerificationQueryHandlers,
  ],
})
export class AccountVerificationModule { }
