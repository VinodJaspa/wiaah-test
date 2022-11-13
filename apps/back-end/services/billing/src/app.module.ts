import { Global, Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { BillingAddressModule } from './billing-address/billing-address.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { getUserFromRequest, KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { StripeBillingModule } from './stripe-billing/stripe-billing.module';
import { StripeModule } from './stripe/stripe.module';
import { BalanceModule } from './balance/balance.module';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
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
})
export class EventModule {}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req, user: getUserFromRequest(req, true) }),
    }),
    EventModule,
    TransactionsModule,
    BillingAddressModule,
    StripeBillingModule,
    StripeModule,
    BalanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
