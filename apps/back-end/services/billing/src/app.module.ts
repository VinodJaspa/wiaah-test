import { Global, Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { BillingAddressModule } from './billing-address/billing-address.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import {
  getUserFromRequest,
  KAFKA_BROKERS,
  SERVICES,
  StripeModule,
} from 'nest-utils';
import { StripeBillingModule } from './stripe-billing/stripe-billing.module';
import { BalanceModule } from './balance/balance.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InvoiceRecordModule } from './invoice-record/invoice-record.module';
import { WithdrawalModule } from './withdrawal/withdrawal.module';
import { FinancialAccountModule } from './financial-account/financial-account.module';

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
    InvoiceRecordModule,
    WithdrawalModule,
    FinancialAccountModule,
  ],
})
export class EventModule {}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: ({ req }) => {
        return {
          req,
          user: getUserFromRequest(req),
          ip: req.ip,
        };
      },
    }),
    EventModule,
    TransactionsModule,
    BillingAddressModule,
    StripeBillingModule,
    BalanceModule,
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_API_SECRET_KEY,
      application_cut_percent: parseInt(process.env.APP_CUT_PERCENT),
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
