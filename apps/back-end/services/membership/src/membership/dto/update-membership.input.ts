import { InputType, Field, ID, Float, PartialType } from '@nestjs/graphql';
import { CommissionOn } from 'prismaClient';

@InputType()
class _MembershipTurnoverRuleInput {
  @Field(() => Float)
  turnover_amount: number;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  commission: number;
}

@InputType()
export class UpdateMembershipTurnoverRuleInput extends PartialType(
  _MembershipTurnoverRuleInput,
) {
  @Field(() => ID)
  id: string;
}

@InputType()
class UpdateMembershipIncludedItemInput {
  @Field(() => String)
  title: string;
}

@InputType()
class _UpdateMembershipInput {
  @Field(() => String)
  name: string;

  @Field(() => CommissionOn)
  comissionOn: CommissionOn;

  @Field(() => [UpdateMembershipIncludedItemInput])
  includings: UpdateMembershipIncludedItemInput[];
}

@InputType()
export class UpdateMembershipInput extends PartialType(_UpdateMembershipInput) {
  @Field(() => ID)
  id: string;

  @Field(() => [UpdateMembershipTurnoverRuleInput], { nullable: true })
  turnover_rules?: UpdateMembershipTurnoverRuleInput[];
}
