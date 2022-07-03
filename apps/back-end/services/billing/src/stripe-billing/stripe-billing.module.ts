import { Module } from '@nestjs/common';
import { StripeBillingService } from './stripe-billing.service';
import { StripeBillingResolver } from './stripe-billing.resolver';
import { StripeModule } from 'src/stripe/stripe.module';
import { BillingAddressModule } from 'src/billing-address/billing-address.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  KAFKA_SERVICE_TOKEN,
  KAFKA_BROKERS,
  KAFKA_SERVICE_CLIENTID,
  KAFKA_SERVICE_GROUPID,
} from 'nest-utils';

@Module({
  imports: [
    BillingAddressModule,
    StripeModule.forRoot({ apiKey: process.env.STRIPE_API_KEY }),
    ClientsModule.register([
      {
        name: KAFKA_SERVICE_TOKEN,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: KAFKA_SERVICE_CLIENTID,
          },
          consumer: {
            groupId: KAFKA_SERVICE_GROUPID,
          },
        },
      },
    ]),
  ],
  providers: [StripeBillingResolver, StripeBillingService],
})
export class StripeBillingModule {}
