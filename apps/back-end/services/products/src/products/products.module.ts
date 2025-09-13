import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { PrismaService } from 'prismaService';

import { ProductsResolver } from '@products/products.resolver';
import { ProductsService } from '@products/products.service';
import { UploadModule, UploadServiceProviders } from '@wiaah/upload';
import { ProductsController } from './products.controller';
import { productsQueryHandlers } from './queries';
import { productEventHandlers } from './events';
import { ProductCommandHandlers } from './command';
import { ProductRepository } from './repository';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductAttributeService } from 'src/product-attribute/product-attribute.service';

@Module({
  imports: [
    CqrsModule,
    UploadModule.forRoot({
      secretKey: 'secret',
      serviceKey: 'servicekey',
      provider: UploadServiceProviders.CLOUDFLARE,
      cloudName: undefined
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
  controllers: [ProductsController],
  providers: [
    ProductsResolver,
    ProductsService,
    PrismaService,
    ProductRepository,
    ProductAttributeService,
    ...productsQueryHandlers,
    ...productEventHandlers,
    ...ProductCommandHandlers,
  ],
})
export class ProductsModule {}
