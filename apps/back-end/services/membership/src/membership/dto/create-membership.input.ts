import {
  InputType,
  Field,
  Float,
  registerEnumType,
  ID,
  Int,
} from '@nestjs/graphql';
import { CommissionOn, commissionType } from 'prismaClient';

registerEnumType(CommissionOn, { name: 'CommissionOn' });
registerEnumType(commissionType, { name: 'CommissionType' });

@InputType()
export class MembershipTurnoverRuleInput {
  @Field(() => Float)
  usage: number;

  @Field(() => Number)
  commission: number;

  @Field(() => commissionType)
  commissionType: commissionType;
}

@InputType()
export class MembershipIncludedItemInput {
  @Field(() => String)
  title: string;
}

@InputType()
export class CreateMembershipInput {
  @Field(() => String)
  name: string;

  @Field(() => CommissionOn)
  commissionOn: CommissionOn;

  @Field(() => Float)
  recurring: number;

  @Field(() => [MembershipTurnoverRuleInput])
  turnover_rules: MembershipTurnoverRuleInput[];

  @Field(() => [MembershipIncludedItemInput])
  includings: MembershipIncludedItemInput[];

  @Field(() => Int)
  sortOrder: number;
}
