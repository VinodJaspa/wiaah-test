import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopResolver } from './shop.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { PrismaService } from 'src/prisma.service';
import { getUserFromRequest, KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsResolver } from './product.resolver';
import { ShopController } from './shop.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context({ req, res }) {
        const user = getUserFromRequest(req);
        return { req, res, user };
      },
      buildSchemaOptions: {
        orphanedTypes: [],
      },
    }),
    ClientsModule.register([
      {
        name: SERVICES.SHOP_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: SERVICES.SHOP_SERVICE.clientId,
            brokers: KAFKA_BROKERS,
          },
          consumer: {
            groupId: SERVICES.SHOP_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  controllers: [ShopController],
  providers: [ShopResolver, ShopService, PrismaService, ProductsResolver],
})
export class ShopModule {}
