import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
class input {}

@InputType()
export class AdminGetUserReturnedOrdersInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;

  @Field(() => ID)
  accountId: string;
}
