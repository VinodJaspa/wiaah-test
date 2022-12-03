import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersResolver } from './partners.resolver';
import { PartnersController } from './partners.controller';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest, KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { PrismaService } from 'src/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloFederationDriver,
      context: ({ req }) => ({ req, user: getUserFromRequest(req) }),
    }),
    ClientsModule.register([
      {
        name: SERVICES.PARTNERS_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.PARTNERS_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.PARTNERS_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [PartnersResolver, PartnersService, PrismaService],
  controllers: [PartnersController],
})
export class PartnersModule {}
