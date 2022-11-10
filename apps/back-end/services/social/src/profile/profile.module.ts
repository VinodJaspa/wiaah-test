import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { PrismaService } from 'prismaService';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

@Module({
  imports: [
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
  providers: [ProfileResolver, ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
