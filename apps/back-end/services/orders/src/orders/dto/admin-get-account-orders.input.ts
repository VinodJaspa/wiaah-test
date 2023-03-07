import { Field, InputType, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

export class input {}

@InputType()
export class AdminGetAccountOrdersInput extends PartialType(input) {
  @Field(() => String)
  accountId: string;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
