import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { SellerOrdersModule } from './seller-orders/seller-orders.module';
import { BuyerOrdersModule } from './buyer-orders/buyer-orders.module';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { getUserFromRequest } from 'nest-utils';
import { OrdersClusterModule } from './orders-cluster/orders-cluster.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req, user: getUserFromRequest(req) }),
    }),
    OrdersModule,
    SellerOrdersModule,
    BuyerOrdersModule,
    OrdersClusterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
