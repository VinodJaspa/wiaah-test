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
import { ShippingCountry } from './country.entity';

registerEnumType(ShippingType, { name: 'ShippingType' });

@ObjectType()
export class ShippingDeliveryTimeRange {
  @Field((type) => Int)
  from: number;

  @Field((type) => Int)
  to: number;
}

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

  @Field((type) => [ShippingType])
  shippingTypes: ShippingType[];

  @Field(() => ShippingDeliveryTimeRange)
  deliveryTimeRange: ShippingDeliveryTimeRange;
}
