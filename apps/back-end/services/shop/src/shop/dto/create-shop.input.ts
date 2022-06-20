import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class LocationInput {
  @Field((type) => Float)
  lat: number;

  @Field((type) => Float)
  long: number;

  @Field((type) => String)
  address: string;
}

@InputType()
export class CreateShopInput {
  @Field((type) => String)
  name: string;

  @Field((type) => LocationInput)
  location: LocationInput;
}
