import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { ShippingType } from '@prisma-client';
import { ArrayNotEmpty } from 'class-validator';
import { ShippingCountry } from 'src/shipping-rules/entities/country.entity';

@InputType()
export class ShippingDeliveryTimeRangeInput {
  @Field((type) => Int)
  from: number;

  @Field((type) => Int)
  to: number;
}

@InputType()
export class CreateShippingRuleInput {
  @Field((type) => [ShippingCountry])
  @ArrayNotEmpty()
  countries: ShippingCountry[];

  @Field((type) => Float)
  cost: number;

  @Field((type) => [ShippingType])
  shippingTypes: [ShippingType];

  @Field((type) => ShippingDeliveryTimeRangeInput)
  deliveryTimeRange: ShippingDeliveryTimeRangeInput;
}
