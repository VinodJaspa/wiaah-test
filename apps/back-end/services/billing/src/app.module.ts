import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { BillingAddressModule } from './billing-address/billing-address.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';

@Module({
  imports: [
    TransactionsModule,
    BillingAddressModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req, user: getUserFromRequest(req) }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
