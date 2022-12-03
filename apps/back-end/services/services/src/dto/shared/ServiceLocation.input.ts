import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ServiceLocationInput {
  @Field(() => String)
  address: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  state: string;

  @Field(() => String)
  city: string;

  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lon: number;

  @Field(() => Int)
  postalCode: number;
}
