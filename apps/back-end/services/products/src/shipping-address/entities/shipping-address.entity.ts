import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Location } from '@shop';

@ObjectType()
export class ShippingAddress {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => Location)
  location: Location;
}
