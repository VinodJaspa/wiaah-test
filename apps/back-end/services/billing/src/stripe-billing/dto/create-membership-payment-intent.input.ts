import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMembershipPaymentIntentInput {
  @Field(() => ID)
  membershipId: string;

  @Field(() => String)
  membershipPriceId: string;
}
