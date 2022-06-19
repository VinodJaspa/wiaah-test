import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class LocationInput {
  @Field((type) => Int)
  lat: number;

  @Field((type) => Int)
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
