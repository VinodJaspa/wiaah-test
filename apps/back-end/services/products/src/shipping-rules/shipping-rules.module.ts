import { Module } from '@nestjs/common';
import { ShippingRulesService } from './shipping-rules.service';
import { ShippingRulesResolver } from './shipping-rules.resolver';
import { ShippingSettingsModule } from '@shipping-settings';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

@Module({
  imports: [
    ShippingSettingsModule,
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
  providers: [ShippingRulesResolver, ShippingRulesService],
})
export class ShippingRulesModule {}
