import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { CqrsModule } from '@nestjs/cqrs';

import { StripeBillingService } from './stripe-billing.service';
import { StripeBillingResolver } from './stripe-billing.resolver';
import { StripeModule } from '../stripe/stripe.module';
import { BillingAddressModule } from '../billing-address/billing-address.module';
import { StripeBillingCommandsHandlers } from './commands';
import { StripeBillingEventsHandlers } from './events';
import { StripeBillingSagas } from './sagas';
import { StripeBillingController } from './stripe-billing.controller';

@Module({
  imports: [
    CqrsModule,
    BillingAddressModule,
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_API_SECRET_KEY,
      application_cut_percent: parseInt(process.env.APP_CUT_PERCENT),
    }),
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
    ...StripeBillingCommandsHandlers,
    ...StripeBillingEventsHandlers,
    ...StripeBillingSagas,
  ],
  controllers: [StripeBillingController],
})
export class StripeBillingModule {}
