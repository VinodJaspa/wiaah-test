import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionResolver } from './reaction.resolver';
import { PrismaService } from 'prismaService';
import { ProfileModule } from '@profile-module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { ContentDiscoveryModule } from '@content-discovery';

@Module({
  imports: [
    ContentDiscoveryModule,
    ProfileModule,
    ClientsModule.register([
      {
        name: SERVICES.SOCIAL_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: SERVICES.SOCIAL_SERVICE.clientId,
            brokers: KAFKA_BROKERS,
          },
          consumer: {
            groupId: SERVICES.SOCIAL_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [ReactionResolver, ReactionService, PrismaService],
})
export class ReactionModule {}
