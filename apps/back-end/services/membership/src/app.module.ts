import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';

import { MembershipModule } from './membership/membership.module';
import { UserMembershipModule } from './user-membership/user-membership.module';
import { PrismaService } from 'prismaService';
import { Account } from './membership/entities';

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
    UserMembershipModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      buildSchemaOptions: {
        orphanedTypes: [Account],
      },
      context: (ctx) => ({ ...ctx, user: getUserFromRequest(ctx.req) }),
    }),
  ],
})
export class AppModule {}
