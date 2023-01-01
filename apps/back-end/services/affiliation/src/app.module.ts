import { Global, Module } from '@nestjs/common';
import { AffiliationModule } from '@affiliation/affiliation.module';
import { PrismaService } from 'prismaService';
import { AffiliationHistoryModule } from '@affiliation-history/affiliation-history.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';
import { AffiliationAdminModule } from '@affiliation/affiliation-admin.module';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [AffiliationHistoryModule],
})
export class GlobalPrisma {}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: (ctx) => ({ ...ctx, user: getUserFromRequest(ctx.req) }),
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: (ctx) => ({ ...ctx, user: getUserFromRequest(ctx.req) }),
      path: 'admin',
      include: [AffiliationAdminModule, AffiliationHistoryModule],
    }),
    AffiliationModule,
    GlobalPrisma,
  ],
})
export class AppModule {}
