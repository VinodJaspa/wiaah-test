import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetNearShopsInput {
  @Field((type) => Float)
  lat: number;

  @Field((type) => Float)
  lon: number;

  @Field((type) => Number)
  distance: number;
}
