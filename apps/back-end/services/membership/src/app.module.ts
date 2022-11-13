import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import {
  getUserFromRequest,
  KAFKA_BROKERS,
  MockedAdminUser,
  SERVICES,
} from 'nest-utils';

import { MembershipModule } from './membership/membership.module';
import { PrismaService } from 'prismaService';
import { Account } from './membership/entities';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

@Module({
  imports: [
    PrismaModule,
    MembershipModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      buildSchemaOptions: {
        orphanedTypes: [Account],
      },
      context: (ctx) => ({
        ...ctx,
        user: getUserFromRequest(ctx.req, true, MockedAdminUser),
      }),
    }),
  ],
})
export class AppModule {}
