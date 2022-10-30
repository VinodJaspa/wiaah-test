import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CqrsModule } from '@nestjs/cqrs';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { getUserFromRequest, KAFKA_BROKERS, SERVICES } from 'nest-utils';

import { LocalizationResolver } from './Localization.resolver';
import { searchCommandHandlers } from './commands';
import { SearchElasticRepository, SearchRepository } from './repository';

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
    ClientsModule.register([
      {
        name: SERVICES.SEARCH_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.SEARCH_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.SEARCH_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [
    LocalizationResolver,
    SearchElasticRepository,
    SearchRepository,
    ...searchCommandHandlers,
  ],
})
export class SearchModule {}
