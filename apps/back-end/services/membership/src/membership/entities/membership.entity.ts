import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import {
  CommissionOn,
  commissionType,
  membershipRecurring,
  MembershipTurnoverRuleType,
} from 'prismaClient';

@ObjectType()
export class MembershipTurnoverRule {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  membershipId: string;

  @Field(() => Number, { nullable: true })
  usage?: number;

  @Field(() => Number)
  commission: number;

  @Field(() => CommissionOn, { nullable: true })
  commissionOn?: CommissionOn;

  @Field(() => commissionType)
  commissionType: commissionType;

  @Field(() => MembershipTurnoverRuleType)
  type: MembershipTurnoverRuleType;

  @Field(() => String)
  key: string;
}

@ObjectType()
export class MembershipIncludedItem {
  @Field(() => String)
  title: string;
}

@ObjectType()
export class Membership {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [String])
  priceIds: string[];

  @Field(() => membershipRecurring)
  recurring: membershipRecurring;

  @Field(() => [MembershipTurnoverRule])
  turnover_rules: MembershipTurnoverRule[];

  @Field(() => [MembershipIncludedItem])
  includings: MembershipIncludedItem[];

  @Field(() => Int)
  sortOrder: number;
}
