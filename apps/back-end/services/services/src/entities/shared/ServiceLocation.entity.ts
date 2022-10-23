import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceLocation {
  @Field(() => String)
  address: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  state: string;

  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lon: number;

  @Field(() => Int)
  postalCode: number;
}
