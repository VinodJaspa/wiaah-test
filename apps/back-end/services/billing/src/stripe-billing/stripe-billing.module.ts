import { Module } from '@nestjs/common';
import { StripeBillingService } from './stripe-billing.service';
import { StripeBillingResolver } from './stripe-billing.resolver';
import { StripeModule } from 'src/stripe/stripe.module';
import { BillingAddressModule } from 'src/billing-address/billing-address.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

@Module({
  imports: [
    BillingAddressModule,
    StripeModule.forRoot({ apiKey: process.env.STRIPE_API_KEY }),
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
  providers: [StripeBillingResolver, StripeBillingService],
})
export class StripeBillingModule {}
