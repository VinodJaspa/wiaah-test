import { ServicePaymentMethodInput } from '@dto';
import { Field, Float, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import { ExtendableGqlPaginationInput } from 'nest-utils';

@InputType()
export class Input extends ExtendableGqlPaginationInput {
  @Field(() => ID)
  establishmentTypeId: string;

  @Field(() => ID)
  cusinesTypeId: string;

  @Field(() => ID)
  settingAndAmbinaceId: string;

  @Field(() => String)
  foodType: string;

  @Field(() => [ServicePaymentMethodInput])
  paymentMethods: ServicePaymentMethodInput[];

  @Field(() => Int)
  rating: number;

  @Field(() => Float)
  minPrice: number;

  @Field(() => Int)
  maxPrice: number;

  @Field(() => String)
  query: string;
}

@InputType()
export class SearchFilteredRestaurantInput extends PartialType(Input) {}
