import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { getUserFromRequest } from 'nest-utils';
import { RefundModule } from './refund/refund.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: './schema.graphql',
      context: ({ req }) => ({ req, user: getUserFromRequest(req) }),
    }),
    PrismaModule,
    OrdersModule,
    RefundModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
