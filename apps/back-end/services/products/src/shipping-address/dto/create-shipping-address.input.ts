import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { LocationInput } from '@shop';

@InputType()
export class CreateShippingAddressInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => LocationInput)
  location: LocationInput;

  @Field(() => String, { nullable: true })
  instractions?: string;

  @Field(() => String, { nullable: true })
  phone?: string;
}
