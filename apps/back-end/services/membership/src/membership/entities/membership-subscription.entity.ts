import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MembershipSubscription {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  membershipId: string;

  @Field(() => String)
  startAt: Date;

  @Field(() => String)
  endAt: Date;
}
