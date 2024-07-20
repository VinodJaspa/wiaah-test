import { Module } from '@nestjs/common';
import { UserActivityStatsModule } from '@user-activity-stats/user-activity-stats.module';
import { PrismaModule } from './prisma.module';
import { UsersInteractionsModule } from './users-interactions/users-interactions.module';
import { EventsModule } from './events/events.module';
import { UserInterestModule } from './user-interest/user-interest.module';
import { UserInterestsController } from './user-interest/user-interests.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { KafkaModule } from './kafka.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';

@Module({
  imports: [
    CqrsModule,
    KafkaModule,
    UsersInteractionsModule,
    UserActivityStatsModule,
    PrismaModule,
    EventsModule,
    UserInterestModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: './schema.graphql',
    }),
  ],
  controllers: [UserInterestsController],
})
export class AppModule { }
