import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import {
  MailingModule as NestMailingModule,
  MailingProviders,
} from 'nestjs-mailing';

import { MailingModule } from './mailing/mailing.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { getUserFromRequest } from 'nest-utils';
import { Mailing } from '@const';
import { PrismaService } from 'prismService';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule { }

@Module({
  imports: [
    NestMailingModule.forRoot({
      mailingEmailEnvKey: Mailing.env.emailKey,
      mailingNameEnvKey: Mailing.env.nameKey,
      apiKeyEnvKey: Mailing.env.apiKey,
      apiSecrentEnvKey: Mailing.env.apiSecretKey,
      provider: MailingProviders.MAILJET,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: (ctx) => ({ ...ctx, user: getUserFromRequest(ctx.req) }),
    }),
    MailingModule,
    NewsletterModule,
  ],
})
export class AppModule { }
