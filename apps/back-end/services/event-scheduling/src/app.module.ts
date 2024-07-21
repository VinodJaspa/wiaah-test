import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from '@prisma-service';
import { EventSchedulingModule } from './event-scheduling/event-scheduling.module';
import { PrismaModule } from './prisma.module';

import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [
    EventSchedulingModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      context: (ctx) => ({ ...ctx, user: getUserFromRequest(ctx.req) }),
      autoSchemaFile: true,
    }),
  ],
})
export class AppModule { }
