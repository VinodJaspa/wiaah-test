import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetMyWithdrawalRequestsInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
