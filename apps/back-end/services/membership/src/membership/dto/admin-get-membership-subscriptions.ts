import {
  Field,
  InputType,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';
import { MembershipSubscriptionStatus } from 'prismaClient';

registerEnumType(MembershipSubscriptionStatus, {
  name: 'MembershipSubscriptionStatus',
});

@InputType()
export class input {
  @Field(() => String)
  username: string;

  @Field(() => String)
  nextPaymentDate: string;

  @Field(() => String)
  expiryDate: string;

  @Field(() => String)
  name: string;

  @Field(() => MembershipSubscriptionStatus)
  status: MembershipSubscriptionStatus;
}

@InputType()
export class AdminGetMembersipSubscriptionInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
