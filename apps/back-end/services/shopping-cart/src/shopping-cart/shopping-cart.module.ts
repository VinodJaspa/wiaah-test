import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartResolver } from './shopping-cart.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';
import { ShoppingCartController } from './shopping-cart.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req, user: getUserFromRequest(req) }),
    }),
  ],
  providers: [ShoppingCartResolver, ShoppingCartService],
  controllers: [ShoppingCartController],
})
export class ShoppingCartModule {}
