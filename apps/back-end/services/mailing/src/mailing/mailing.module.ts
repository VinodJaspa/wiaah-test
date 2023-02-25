import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailingController } from './mailing.controller';
import { MailingQueryhandlers } from './queries';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { MailingResolver } from './mailing.resolver';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: SERVICES.MAILING_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.MAILING_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.MAILING_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  controllers: [MailingController],
  providers: [MailingService, MailingResolver, ...MailingQueryhandlers],
})
export class MailingModule {}
