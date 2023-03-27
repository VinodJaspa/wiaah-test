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
import { stripeBillingQueryHandlers } from './queries';
import { PrismaService } from 'prismaService';
import { WithdrawCurrencyResolver } from './withdraw-currency.resolver';

@Module({
  imports: [
    CqrsModule,
    BillingAddressModule,
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_API_SECRET_KEY,
      application_cut_percent: parseInt(process.env.APP_CUT_PERCENT),
      webhookSecret:
        'whsec_db22ec16b983f8b3f6e18feb98f4969494d6df89614868a7bf47d926788c0e94',
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
