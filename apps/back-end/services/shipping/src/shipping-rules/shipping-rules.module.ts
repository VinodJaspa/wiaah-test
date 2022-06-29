import { Module } from '@nestjs/common';
import { ShippingRulesService } from './shipping-rules.service';
import { ShippingRulesResolver } from './shipping-rules.resolver';
import { ShippingSettingsModule } from 'src/shipping-settings/shipping-settings.module';

@Module({
  imports: [ShippingSettingsModule],
  providers: [ShippingRulesResolver, ShippingRulesService],
})
export class ShippingRulesModule {}
