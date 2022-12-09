import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserLocationInput {
  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lon: number;
}
