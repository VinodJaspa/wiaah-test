import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { MembershipSubscriptionStatus } from 'prismaClient';

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

  @Field(() => MembershipSubscriptionStatus)
  status: MembershipSubscriptionStatus;

  @Field(() => Float)
  usage: number;
}
