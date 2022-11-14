import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { MembershipType, MembershipUnitType } from 'prismaClient';

@ObjectType()
export class MembershipTurnoverRule {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  membershipId: string;

  @Field(() => String, { nullable: true })
  priceId?: string;

  @Field(() => Float)
  turnover_amount: number;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  commission: number;
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

  @Field(() => MembershipType)
  type: MembershipType;

  @Field(() => MembershipUnitType, { nullable: true })
  unit_type: MembershipUnitType;

  @Field(() => Float)
  unit_price: number;

  @Field(() => [MembershipTurnoverRule])
  turnover_rules: MembershipTurnoverRule[];

  @Field(() => [MembershipIncludedItem])
  includings: MembershipIncludedItem[];
}
