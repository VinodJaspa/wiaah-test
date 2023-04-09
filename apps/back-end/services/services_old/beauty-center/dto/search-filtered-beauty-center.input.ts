import { Field, Float, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import { ExtendableGqlPaginationInput } from 'nest-utils';

@InputType()
class Input extends ExtendableGqlPaginationInput {
  @Field(() => String)
  typeOfSeller: string;

  @Field(() => ID)
  beautyCenterTypeId: string;

  @Field(() => ID)
  beautySalonTypeId: string;

  @Field(() => ID)
  treatmentTypeId: string;

  @Field(() => Boolean)
  cancelationOption: boolean;

  @Field(() => Int)
  rating: number;

  @Field(() => Float)
  minPrice: number;

  @Field(() => Float)
  maxPrice: number;

  @Field(() => String)
  query: string;
}

@InputType()
export class SearchFilteredBeautyCenterInput extends PartialType(Input) {}
