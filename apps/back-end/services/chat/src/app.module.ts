import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';

import { RoomModule } from './room/room.module';
import { PrismaService } from './prisma.service';
import { MessageModule } from './message/message.module';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [MessageModule],
})
class PrismaModule {}

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: ({ req }) => {
        const user = getUserFromRequest(req);
        return { req, user };
      },
    }),
    RoomModule,
  ],
})
export class AppModule {}
