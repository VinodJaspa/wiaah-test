import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { FilteredShopsInput } from './filter-shops.input';

@InputType()
export class GetNearShopsInput {
  @Field((type) => Float)
  lat: number;

  @Field((type) => Float)
  lon: number;

  @Field((type) => Number)
  distance: number;
}
