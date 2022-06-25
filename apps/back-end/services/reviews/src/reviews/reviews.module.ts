import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsController } from './reviews.controller';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { PrismaService } from 'src/Prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  AuthorizationDecodedUser,
  getUserFromRequest,
  KAFKA_BROKERS,
  SERVICES,
} from 'nest-utils';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: ({ req }) => {
        const user = getUserFromRequest(req);
        return { req, user };
      },
    }),
    ClientsModule.register([
      {
        name: SERVICES.PRODUCTS_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.PRODUCTS_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.PRODUCTS_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [ReviewsResolver, ReviewsService, PrismaService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
