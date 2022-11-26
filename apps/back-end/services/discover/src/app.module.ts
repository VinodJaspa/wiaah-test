import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';
import { ScheduleModule } from '@nestjs/schedule';
import { CommunityModule } from '@community/community.module';
import { UserActivityStatsModule } from '@user-activity-stats/user-activity-stats.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    PrismaModule,
    ScheduleModule.forRoot(),
    CommunityModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      context: (ctx) => ({ ...ctx, user: getUserFromRequest(ctx.req) }),
      autoSchemaFile: true,
    }),
    UserActivityStatsModule,
  ],
  providers: [],
})
export class AppModule {}
