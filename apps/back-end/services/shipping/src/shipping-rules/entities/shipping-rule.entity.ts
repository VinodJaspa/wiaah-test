import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { ShippingType } from '@prisma-client';
import { ShippingCountry } from './country.entity';

registerEnumType(ShippingType, { name: 'ShippingType' });

@ObjectType()
export class ShippingRule {
  @Field((type) => ID)
  id: string;

  @Field((type) => [ShippingCountry])
  countries: ShippingCountry[];

  @Field((type) => Float)
  cost: number;

  @Field((type) => [ShippingType])
  shippingTypes: ShippingType[];
}
