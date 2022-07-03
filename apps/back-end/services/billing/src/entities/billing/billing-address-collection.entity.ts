import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BillingAddress } from '@entities';

@ObjectType()
export class BillingAddressCollection {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  ownerId: string;

  @Field((type) => [BillingAddress])
  billingAddresses: BillingAddress[];

  createdAt: Date;
  updatedAt: Date;
}
