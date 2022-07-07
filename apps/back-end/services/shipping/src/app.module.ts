import { Module } from '@nestjs/common';
import { ShippingSettingsModule } from './shipping-settings/shipping-settings.module';
import { ShippingRulesModule } from './shipping-rules/shipping-rules.module';
import { ShippingDetailsModule } from './shipping-details/shipping-details.module';

@Module({
  imports: [ShippingSettingsModule, ShippingRulesModule, ShippingDetailsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
