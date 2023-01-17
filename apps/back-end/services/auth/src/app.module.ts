import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserAuthSettingsModule } from './user-auth-settings/user-auth-settings.module';
import { AuthOtpModule } from './auth-otp/auth-otp.module';
import { AuthAdminModule } from '@auth/auth-admin.module';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    AuthModule,
    UserAuthSettingsModule,
    AuthOtpModule,
    AuthAdminModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: 'schema.graphql',
      context: ({ req, res }) => {
        const user = getUserFromRequest(req);
        return { req, res, user };
      },
    }),
  ],
})
export class AppModule {}
