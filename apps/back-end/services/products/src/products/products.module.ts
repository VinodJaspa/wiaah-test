import { Module } from '@nestjs/common';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GraphQLModule } from '@nestjs/graphql';
import { getUserFromRequest, KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { PrismaService } from 'src/Prisma.service';
import { ShopResolver } from './shop.resolver';
import { Shop } from './entities/shop.entity';
import { SearchResolver } from './search.resolver';
import { Search } from './entities/search.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: './schema.graphql',
      context({ req, res }) {
        const user = getUserFromRequest(req);
        return { req, res, user };
      },
      buildSchemaOptions: {
        orphanedTypes: [Shop, Search],
      },
    }),
    ClientsModule.register([
      {
        name: SERVICES.WISHLIST_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.WISHLIST_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.WISHLIST_SERVICE.groupId,
          },
        },
      },
      {
        name: SERVICES.SHOP_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.SHOP_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.SHOP_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [
    ProductsResolver,
    ProductsService,
    PrismaService,
    ShopResolver,
    SearchResolver,
  ],
  controllers: [ProductsController],
})
export class ProdutctsModule {}
