import { Module } from '@nestjs/common';
import { SearchResolver } from './search.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { CqrsModule } from '@nestjs/cqrs';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';
import { searchCommandHandlers } from './commands';
import { SearchElasticRepository } from './repository';

@Module({
  imports: [
    CqrsModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: ({ req, res }) => {
        const user = getUserFromRequest(req);
        return { req, res, user };
      },
    }),
  ],
  providers: [
    SearchResolver,
    SearchElasticRepository,
    ...searchCommandHandlers,
  ],
})
export class SearchModule {}
