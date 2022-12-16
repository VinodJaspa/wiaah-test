import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetFilteredOrdersInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
