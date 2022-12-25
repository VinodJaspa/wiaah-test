import { Module } from '@nestjs/common';
import { ShippingTypeRuleResolver } from './shipping-type-rule.resolver';

@Module({
  providers: [ShippingTypeRuleResolver],
})
export class ShippingTypeRuleModule {}
