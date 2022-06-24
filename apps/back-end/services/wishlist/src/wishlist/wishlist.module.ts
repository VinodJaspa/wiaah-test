import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistResolver } from './wishlist.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { PrismaService } from 'src/prisma.service';
import { WishlistController } from './wishlist.controler';
import { getUserFromRequest } from 'nest-utils';
import { WisherslistModule } from 'src/wisherslist/wisherslist.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      buildSchemaOptions: {},
      context: ({ req }) => {
        const user = getUserFromRequest(req);
        return { req, user };
      },
    }),
    WisherslistModule,
  ],
  controllers: [WishlistController],
  providers: [WishlistResolver, WishlistService, PrismaService],
})
export class WishlistModule {}
