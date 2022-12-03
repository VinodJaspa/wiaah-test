import { Field, ID, InputType } from '@nestjs/graphql';
import { ExtendableGqlPaginationInput } from 'nest-utils';

@InputType()
export class GetStorySeenByInput extends ExtendableGqlPaginationInput {
  @Field(() => ID)
  storyId: string;
}
