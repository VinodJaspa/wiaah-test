import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { getUserFromRequest, StripeModule } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { AccountsModule } from './accounts/accounts.module';
import { IdentityVerificationModule } from './identity-verification/identity-verification.module';
import { AccountVerificationModule } from './account-verification/account-verification.module';
import { CookiesSettingsModule } from './cookies-settings/cookies-settings.module';
import { UserLocationModule } from './user-location/user-location.module';
import { RequiredActionsModule } from './required-actions/required-actions.module';
import { UserContactsModule } from './user-contacts/user-contacts.module';

import * as path from 'path';


import { UploadModule, UploadServiceProviders } from '@wiaah/upload';
import { APP_FILTER } from '@nestjs/core';
import { KnownErrorFilter } from './comman/filters/known-error.filter';

// Assuming 'src' is the root directory of your application
const absoluteSchemaPath = path.join(__dirname, '..', 'src', 'schema.graphql');

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [RequiredActionsModule, UserContactsModule],
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
      autoSchemaFile: absoluteSchemaPath, // Specify absolute path here
      context({ req, res }) {
        const user = getUserFromRequest(req);
        return { req, res, user };
      },
    }),
    AccountsModule,
    IdentityVerificationModule,
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_API_SECRET_KEY,
      application_cut_percent: parseInt(process.env.APP_CUT_PERCENT),
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    }),
    UploadModule.forRoot({
      provider: UploadServiceProviders.CLOUDINARY,  
      serviceKey: process.env.CLOUDINARY_API_KEY,
      secretKey: process.env.CLOUDINARY_API_SECRET,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: KnownErrorFilter,
    },
  ],
})
export class AppModule {}
