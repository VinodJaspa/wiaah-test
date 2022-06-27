import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyResolver } from './currency.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';
import { PrismaService } from 'src/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { FixerModule } from 'src/fixer/fixer.module';
import { CurrencyController } from './currency.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req, user: getUserFromRequest(req) }),
    }),
    FixerModule.forRoot({ apiKey: 'y8AQOHGl6XN5VOOW2JltU9O9IRrJFgWD' }),
  ],
  providers: [CurrencyResolver, CurrencyService, PrismaService],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
