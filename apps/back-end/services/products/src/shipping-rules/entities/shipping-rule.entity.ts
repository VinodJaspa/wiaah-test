import {
  Directive,
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { ShippingType } from '@prisma-client';
import { ShippingDeliveryTimeRange } from '@shipping-details';
import { ShippingCountry } from './country.entity';

registerEnumType(ShippingType, { name: 'ShippingType' });

@ObjectType()
@Directive('@key(fields:"id")')
export class ShippingRule {
  @Field((type) => ID)
  id: string;

  @Field(() => ID)
  sellerId: string;

  @Field(() => String)
  name: string;

  @Field((type) => [ShippingCountry])
  countries: ShippingCountry[];

  @Field((type) => Float)
  cost: number;

  @Field((type) => ShippingType)
  shippingType: ShippingType;

  @Field(() => ShippingDeliveryTimeRange)
  deliveryTimeRange: ShippingDeliveryTimeRange;
}
