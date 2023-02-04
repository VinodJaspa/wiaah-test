import { Field, ID, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetRefundableOrdersInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
