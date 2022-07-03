import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id,ownerId")')
export class BillingAddress {
  @Field((type) => ID)
  ownerId: String;

  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  address: string;

  @Field((type) => String)
  address2: string;

  @Field((type) => String)
  country: string;

  @Field((type) => String)
  state: string;

  @Field((type) => String)
  city: string;

  @Field((type) => String)
  postalCode: string;

  @Field((type) => String)
  phone: string;
}
