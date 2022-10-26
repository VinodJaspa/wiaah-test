import { Field, Float, InputType, Int, PartialType } from '@nestjs/graphql';
import { ExtendableGqlPaginationInput } from 'nest-utils';

@InputType()
class input extends ExtendableGqlPaginationInput {
  @Field(() => String)
  query: string;

  @Field(() => String)
  property_type: string;

  @Field(() => Int)
  num_of_rooms: number;

  @Field(() => Int)
  num_of_beds: number;

  @Field(() => Int)
  hotel_class: number;

  @Field(() => Int)
  rating: number;

  @Field(() => Float)
  minPrice: number;

  @Field(() => Float)
  maxPrice: number;
}

@InputType()
export class SearchHotelRoomLocationInput extends PartialType(input) {}
