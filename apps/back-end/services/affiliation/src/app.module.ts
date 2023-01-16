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
  imports: [],
})
export class GlobalPrisma {}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: './schema.graphql',
      context: (ctx) => ({ ...ctx, user: getUserFromRequest(ctx.req) }),
    }),
    AffiliationHistoryModule,
    AffiliationAdminModule,
    AffiliationModule,
    GlobalPrisma,
  ],
})
export class AppModule {}
