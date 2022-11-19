import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

import { ShippingRulesService } from './shipping-rules.service';
import { ShippingRulesResolver } from './shipping-rules.resolver';
import { ShippingDetailsResolver } from './shipping-details.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICES.SHIPPING_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.SHIPPING_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.SHIPPING_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [
    ShippingRulesResolver,
    ShippingDetailsResolver,
    ShippingRulesService,
  ],
})
export class ShippingRulesModule {}
