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
import { ShippingDeliveryTimeRange } from '@shipping-details';

registerEnumType(ShippingType, { name: 'ShippingType' });

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
