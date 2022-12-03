import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { getUserFromRequest } from 'nest-utils';

import { ManagerModule } from './manager/manager.module';
import { NotificationSettingsModule } from './notification-settings/notification-settings.module';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';

@Module({
  imports: [
    ManagerModule,
    NotificationSettingsModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: (ctx) => ({ ...ctx, user: getUserFromRequest(ctx.req) }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
