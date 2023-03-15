import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest, KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartResolver } from './shopping-cart.resolver';
import { ShoppingCartController } from './shopping-cart.controller';
import { CartProductResolver } from './cart-product.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res, user: getUserFromRequest(req) }),
    }),
    ClientsModule.register([
      {
        name: SERVICES.SHOPPING_CART_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.SHOPPING_CART_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.SHOPPING_CART_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [ShoppingCartResolver, ShoppingCartService, CartProductResolver],
  controllers: [ShoppingCartController],
})
export class ShoppingCartModule {}
