import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';
import { CommunityModule } from './community/community.module';

@Module({
  imports: [
    CommunityModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      context: (ctx) => ({ ...ctx, user: getUserFromRequest(ctx.req) }),
      autoSchemaFile: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
