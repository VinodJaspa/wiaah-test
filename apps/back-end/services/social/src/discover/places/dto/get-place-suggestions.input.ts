import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetPlaceSuggestionInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
