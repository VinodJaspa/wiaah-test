import {
  CreateShippingRuleGeoZoneInput,
  CreateShippingTypeRuleInput,
} from './create-shipping-type-rule.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { ShippingType } from '@prisma-client';

@InputType()
export class UpdateShippingRuleGeoZoneInput extends PartialType(
  CreateShippingRuleGeoZoneInput,
) {
  @Field(() => String)
  id: string;
}

@InputType()
export class input {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => ShippingType)
  type: ShippingType;

  @Field(() => [UpdateShippingRuleGeoZoneInput])
  zones: UpdateShippingRuleGeoZoneInput[];
}

@InputType()
export class UpdateShippingTypeRuleInput extends PartialType(input) {
  @Field(() => String)
  id: string;
}
