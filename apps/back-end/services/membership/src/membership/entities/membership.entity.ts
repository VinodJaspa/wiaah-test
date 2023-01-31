import {
  ObjectType,
  Field,
  Int,
  ID,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { CommissionOn, commissionType, Recurring } from 'prismaClient';

registerEnumType(Recurring, { name: 'Recurring' });

@ObjectType()
export class MembershipTurnoverRule {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  membershipId: string;

  @Field(() => String, { nullable: true })
  priceId?: string;

  @Field(() => Number)
  usage: number;

  @Field(() => Number)
  commission: number;

  @Field(() => commissionType)
  commissionType: commissionType;
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

  @Field(() => String, { nullable: true })
  priceId?: string;

  @Field(() => CommissionOn)
  commissionOn: CommissionOn;

  @Field(() => Recurring)
  recurring: Recurring;

  @Field(() => [MembershipTurnoverRule])
  turnover_rules: MembershipTurnoverRule[];

  @Field(() => [MembershipIncludedItem])
  includings: MembershipIncludedItem[];
}
