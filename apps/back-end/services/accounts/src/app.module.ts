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

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [AccountVerificationModule],
})
export class PrismaModule {}

@Module({
  imports: [
    PrismaModule,
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
