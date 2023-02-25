import { InputType, Field, PartialType } from '@nestjs/graphql';
import { ShippingType } from '@prisma-client';

@InputType()
export class CreateShippingRuleGeoZoneInput {
  @Field(() => String)
  country: string;

  @Field(() => String)
  zone: string;
}



@InputType()
export class CreateShippingTypeRuleInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => ShippingType)
  type: ShippingType;

  @Field(() => [CreateShippingRuleGeoZoneInput])
  zones: CreateShippingRuleGeoZoneInput[];
}
