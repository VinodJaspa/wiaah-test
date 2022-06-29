import { Field, Float, InputType } from '@nestjs/graphql';
import { ShippingType } from '@prisma-client';
import { ArrayNotEmpty } from 'class-validator';
import { ShippingCountry } from 'src/shipping-rules/entities/country.entity';

@InputType()
export class CreateShippingRuleInput {
  @Field((type) => [ShippingCountry])
  @ArrayNotEmpty()
  countries: ShippingCountry[];

  @Field((type) => Float)
  cost: number;

  @Field((type) => [ShippingType])
  shippingTypes: [ShippingType];
}
