import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetNearShopsInput {
  @Field((type) => Int)
  lat: number;

  @Field((type) => Int)
  lon: number;

  @Field((type) => Number)
  distance: number;
}
