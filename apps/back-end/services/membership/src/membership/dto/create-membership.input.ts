import { InputType, Field, Float, registerEnumType, ID } from '@nestjs/graphql';
import { MembershipType, MembershipUnitType } from 'prismaClient';

registerEnumType(MembershipType, { name: 'MembershipType' });
registerEnumType(MembershipUnitType, { name: 'MembershipUnitType' });

@InputType()
export class MembershipTurnoverRuleInput {
  @Field(() => Float)
  turnover_amount: number;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  commission: number;
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

  @Field(() => MembershipUnitType, { nullable: true })
  unit_type?: MembershipUnitType;

  @Field(() => MembershipType)
  type: MembershipType;

  @Field(() => [MembershipTurnoverRuleInput])
  turnover_rules: MembershipTurnoverRuleInput[];

  @Field(() => [MembershipIncludedItemInput])
  includings: MembershipIncludedItemInput;
}
