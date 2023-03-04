import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetAddableHashtagsInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
