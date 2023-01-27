import { InputType, Field, Float, registerEnumType, ID } from '@nestjs/graphql';
import { CommissionOn, commissionType, Recurring } from 'prismaClient';

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

  @Field(() => Recurring)
  recurring: Recurring;

  @Field(() => [MembershipTurnoverRuleInput])
  turnover_rules: MembershipTurnoverRuleInput[];

  @Field(() => [MembershipIncludedItemInput])
  includings: MembershipIncludedItemInput[];
}
