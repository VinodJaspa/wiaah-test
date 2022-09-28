import { Module } from '@nestjs/common';
import { ContentShareService } from './content-share.service';
import { ContentShareResolver } from './content-share.resolver';
import { ProfileModule } from '@profile-module';
import { ContentDiscoveryModule } from '@content-discovery';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { ContentManagementModule } from '@content-management';

@Module({
  imports: [
    ProfileModule,
    ContentDiscoveryModule,
    ContentManagementModule,
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
  providers: [ContentShareResolver, ContentShareService, PrismaService],
})
export class ContentShareModule {}
