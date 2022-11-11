import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class PurchaseMembershipInput {
  @Field(() => ID)
  memberShipId: string;
}
