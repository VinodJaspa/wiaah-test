import { Module } from '@nestjs/common';
import { ShippingSettingsModule } from './shipping-settings/shipping-settings.module';
import { ShippingRulesModule } from './shipping-rules/shipping-rules.module';

@Module({
  imports: [ShippingSettingsModule, ShippingRulesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
