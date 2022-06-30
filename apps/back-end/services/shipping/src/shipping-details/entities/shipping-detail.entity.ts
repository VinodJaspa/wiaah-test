import {
  ObjectType,
  Field,
  Int,
  Float,
  Directive,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { ShippingType } from '@prisma-client';

registerEnumType(ShippingType, { name: 'ShippingType' });

@ObjectType()
export class ShippingDeliveryTimeRange {
  @Field((type) => Int)
  from: number;

  @Field((type) => Int)
  to: number;
}

@ObjectType()
@Directive('@key(fields: "country, shippingRulesIds")')
export class ShippingDetails {
  @Field((type) => String)
  country: string;

  @Field((type) => [ID])
  shippingRulesIds: string[];

  @Field((type) => Float, { nullable: true })
  cost: number;

  @Field((type) => Boolean)
  available: boolean;

  @Field((type) => ShippingDeliveryTimeRange, { nullable: true })
  deliveryTimeRange: ShippingDeliveryTimeRange;

  @Field((type) => [ShippingType], { nullable: true })
  shippingTypes: ShippingType[];
}
