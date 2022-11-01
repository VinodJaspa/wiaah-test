import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { BillingAddressModule } from './billing-address/billing-address.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';
import { StripeBillingModule } from './stripe-billing/stripe-billing.module';
import { StripeModule } from './stripe/stripe.module';
import { BalanceModule } from './balance/balance.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req, user: getUserFromRequest(req) }),
    }),
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
