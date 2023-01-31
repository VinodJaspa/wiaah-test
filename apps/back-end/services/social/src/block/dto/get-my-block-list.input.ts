import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetMyBlocklistInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
