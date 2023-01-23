import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { HashtagModule } from './hashtag/hashtag.module';
import { PrismaService } from './prisma.service';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

@Module({
  imports: [
    HashtagModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: './schema.graphql',
      context: (ctx) => getUserFromRequest(ctx.req),
    }),
  ],
})
export class AppModule {}
