import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceResolver } from './service.resolver';
import { AdminServiceResolver } from './service.admin.resolver';
import { UploadModule, UploadServiceProviders } from '@wiaah/upload';
import { resolvers } from './resolvers';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

@Module({
  imports: [
    UploadModule.forRoot({
      secretKey: 'secret',
      serviceKey: 'servicekey',
      provider: UploadServiceProviders.CLOUDFLARE,
    }),
    ClientsModule.register([
      {
        name: SERVICES.SERVICES_SERIVCE.token,
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
  providers: [
    ServiceResolver,
    ServiceService,
    AdminServiceResolver,
    ...resolvers,
  ],
})
export class ServiceModule {}
