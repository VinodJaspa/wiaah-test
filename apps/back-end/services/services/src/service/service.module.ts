import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceResolver } from './service.resolver';
import { AdminServiceResolver } from './service.admin.resolver';
import { UploadModule, UploadServiceProviders } from '@wiaah/upload';
import { resolvers } from './resolvers';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { servicesEventHandlers } from './events/handlers';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
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
    PrismaService,
    ...resolvers,
    ...servicesEventHandlers,
  ],
  exports: [ServiceService],
})
export class ServiceModule {}
