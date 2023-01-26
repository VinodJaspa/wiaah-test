import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetPlaceSuggestionsInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
