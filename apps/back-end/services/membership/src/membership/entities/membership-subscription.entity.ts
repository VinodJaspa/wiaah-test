import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Membership } from './membership.entity';

@ObjectType()
export class MembershipSubscription {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  membershipId: string;

  @Field(() => Membership)
  membership: Membership;

  @Field(() => String)
  startAt: Date;

  @Field(() => String)
  endAt: Date;
}
