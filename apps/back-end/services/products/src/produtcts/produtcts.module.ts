import { Module } from '@nestjs/common';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ProdutctsService } from './produtcts.service';
import { ProductsResolver } from './produtcts.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { getUserFromRequest } from 'nest-utils';
import { PrismaService } from 'src/Prisma.service';
import { ShopResolver } from './shop.resolver';
import { Shop } from './entities/shop.entity';
import { SearchResolver } from './search.resolver';

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
        orphanedTypes: [Shop],
      },
    }),
  ],
  providers: [
    ProductsResolver,
    ProdutctsService,
    PrismaService,
    ShopResolver,
    SearchResolver,
  ],
})
export class ProdutctsModule {}
