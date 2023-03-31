import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { CqrsModule } from '@nestjs/cqrs';

import { StripeBillingService } from './stripe-billing.service';
import { StripeBillingResolver } from './stripe-billing.resolver';
import { StripeModule } from 'nest-utils';
import { BillingAddressModule } from '../billing-address/billing-address.module';
import { StripeBillingCommandsHandlers } from './commands';
import { StripeBillingEventsHandlers } from './events';
import { StripeBillingSagas } from './sagas';
import { StripeBillingController } from './stripe-billing.controller';
import { stripeBillingQueryHandlers } from './queries';
import { PrismaService } from 'prismaService';
import { WithdrawCurrencyResolver } from './withdraw-currency.resolver';

@Module({
  imports: [
    CqrsModule,
    BillingAddressModule,
    ClientsModule.register([
      {
        name: SERVICES.BILLING_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.BILLING_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.BILLING_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [
    StripeBillingResolver,
    StripeBillingService,
    WithdrawCurrencyResolver,
    PrismaService,
    ...StripeBillingCommandsHandlers,
    ...StripeBillingEventsHandlers,
    ...stripeBillingQueryHandlers,
    ...StripeBillingSagas,
  ],
  controllers: [StripeBillingController],
})
export class StripeBillingModule {}
