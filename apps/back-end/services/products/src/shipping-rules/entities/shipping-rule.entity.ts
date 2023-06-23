import {
  Directive,
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { ShippingDestination, ShippingType } from '@prisma-client';
import { ShippingDeliveryTimeRange } from '@shipping-details';
import { ShippingCountry } from './country.entity';

registerEnumType(ShippingType, { name: 'ShippingType' });
registerEnumType(ShippingDestination, { name: 'ShippingDestination' });

@ObjectType()
@Directive('@key(fields:"id")')
export class ShippingRule {
  @Field((type) => ID)
  id: string;

  @Field(() => ID)
  sellerId: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  shippingCompanyName: string;

  @Field(() => ShippingDestination)
  destination: ShippingDestination;

  // @Field(() => [ShippingCountry])
  // countries: ShippingCountry[];

  @Field(() => Float)
  cost: number;

  @Field(() => ShippingType)
  shippingType: ShippingType;

  @Field(() => ShippingDeliveryTimeRange)
  deliveryTimeRange: ShippingDeliveryTimeRange;
}
