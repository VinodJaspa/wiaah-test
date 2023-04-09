import { Field, Float, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import { ExtendableGqlPaginationInput } from 'nest-utils';

@InputType()
export class Input extends ExtendableGqlPaginationInput {
  @Field(() => String)
  vehicleType: string;

  @Field(() => Int)
  securityDeposit: number;

  @Field(() => Int)
  passengerNum: number;

  @Field(() => Int)
  seatsNum: number;

  @Field(() => ID)
  vehicleTypeId: string;

  @Field(() => Int)
  rating: number;

  @Field(() => Float)
  minPrice: number;

  @Field(() => Float)
  maxPrice: number;

  @Field(() => Boolean)
  freeCancelation: boolean;

  @Field(() => String)
  query: string;
}

export class SearchFilteredVehicleInput extends PartialType(Input) {}
