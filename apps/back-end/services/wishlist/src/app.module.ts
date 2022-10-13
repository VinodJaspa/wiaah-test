import { Module } from '@nestjs/common';
import { WishlistModule } from './wishlist/wishlist.module';
import { WisherslistModule } from './wisherslist/wisherslist.module';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { getUserFromRequest } from 'nest-utils';

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
    WishlistModule,
    WisherslistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
