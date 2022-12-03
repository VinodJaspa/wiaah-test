import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from './Prisma.service';
import { ProductReviewModule } from './product-review/product-review.module';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaGlobalModule {}

@Module({
  imports: [
    PrismaGlobalModule,
    ProductReviewModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      context: (ctx) => ({ ...ctx, user: getUserFromRequest(ctx.req) }),
      autoSchemaFile: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
