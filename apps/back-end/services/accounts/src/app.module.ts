import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { getUserFromRequest } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { AccountsModule } from './accounts/accounts.module';
import { IdentityVerificationModule } from './identity-verification/identity-verification.module';
import { AccountVerificationModule } from './account-verification/account-verification.module';
import { CookiesSettingsModule } from './cookies-settings/cookies-settings.module';
import { UserLocationModule } from './user-location/user-location.module';
import { RequiredActionsModule } from './required-actions/required-actions.module';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [RequiredActionsModule],
})
export class PrismaModule {}

@Module({
  imports: [
    PrismaModule,
    AccountVerificationModule,
    CookiesSettingsModule,
    UserLocationModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context({ req, res }) {
        const user = getUserFromRequest(req);
        return { req, res, user };
      },
    }),
    AccountsModule,
    IdentityVerificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
