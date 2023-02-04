import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';
import { Location } from '@shop';

@ObjectType()
@Directive('@key(fields:"id")')
export class ShippingAddress {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => Location)
  location: Location;
}
