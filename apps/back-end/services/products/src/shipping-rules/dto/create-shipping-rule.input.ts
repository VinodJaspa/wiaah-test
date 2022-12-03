import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { ShippingType } from '@prisma-client';
import { ArrayNotEmpty } from 'class-validator';

@InputType()
export class ShippingCountryInput {
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  code: string;
}

@InputType()
export class ShippingDeliveryTimeRangeInput {
  @Field((type) => Int)
  from: number;

  @Field((type) => Int)
  to: number;
}

@InputType()
export class CreateShippingRuleInput {
  @Field((type) => [ShippingCountryInput])
  @ArrayNotEmpty()
  countries: ShippingCountryInput[];

  @Field(() => String)
  name: string;

  @Field((type) => Float)
  cost: number;

  @Field((type) => [ShippingType])
  shippingTypes: ShippingType[];

  @Field((type) => ShippingDeliveryTimeRangeInput)
  deliveryTimeRange: ShippingDeliveryTimeRangeInput;
}
