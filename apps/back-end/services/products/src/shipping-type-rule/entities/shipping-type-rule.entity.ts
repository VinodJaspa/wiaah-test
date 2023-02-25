import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { ShippingType } from '@prisma-client';

@ObjectType()
export class ShippingRuleGeoZone {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  zone: string;

  @Field(() => ID)
  shippingTypeRuleId: string;
}

@ObjectType()
export class ShippingTypeRule {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => ShippingType)
  type: ShippingType;

  @Field(() => [ShippingRuleGeoZone])
  zones: ShippingRuleGeoZone;
}
