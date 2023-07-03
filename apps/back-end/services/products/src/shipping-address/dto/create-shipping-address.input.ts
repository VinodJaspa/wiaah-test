import { InputType, Int, Field, ID, Float } from '@nestjs/graphql';
import { LocationInput } from '@shop';

@InputType()
export class CreateShippingAddressInput {
  @Field(() => ID)
  ownerId: string;

  @Field(() => LocationInput)
  location: LocationInput;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;

  @Field(() => String, { nullable: true })
  zipCode?: string;

  @Field(() => String, { nullable: true })
  instractions?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => Float)
  lng: number;

  @Field(() => Float)
  lat: number;
}
