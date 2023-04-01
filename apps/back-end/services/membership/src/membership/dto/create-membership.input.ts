import {
  InputType,
  Field,
  Float,
  registerEnumType,
  Int,
} from '@nestjs/graphql';
import { FieldRequired } from 'nest-utils';
import {
  CommissionOn,
  commissionType,
  membershipRecurring,
  MembershipTurnoverRuleType,
} from 'prismaClient';

registerEnumType(CommissionOn, { name: 'CommissionOn' });
registerEnumType(commissionType, { name: 'CommissionType' });
registerEnumType(MembershipTurnoverRuleType, {
  name: 'MembershipTurnoverRuleType',
});
registerEnumType(membershipRecurring, { name: 'MembershipRecurring' });

@InputType()
export class MembershipTurnoverRuleInput {
  @Field(() => Float, { nullable: true })
  usage?: number;

  @Field(() => Number)
  commission: number;

  @Field(() => CommissionOn)
  commissionOn: CommissionOn;

  @Field(() => commissionType)
  @FieldRequired('type', MembershipTurnoverRuleType.usage)
  commissionType: commissionType;

  @Field(() => MembershipTurnoverRuleType)
  type: MembershipTurnoverRuleType;

  @Field(() => String)
  key: string;
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

  @Field(() => membershipRecurring)
  recurring: membershipRecurring;

  @Field(() => [MembershipTurnoverRuleInput])
  turnover_rules: MembershipTurnoverRuleInput[];

  @Field(() => [MembershipIncludedItemInput])
  includings: MembershipIncludedItemInput[];

  @Field(() => Int)
  sortOrder: number;
}
