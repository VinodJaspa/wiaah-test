import { Field, ID, InputType } from '@nestjs/graphql';
import { ExtendableGqlPaginationInput } from 'nest-utils';
import { ContentHostType } from 'prismaClient';

@InputType()
export class GetCommentsOfContent extends ExtendableGqlPaginationInput {
  @Field(() => [ContentHostType])
  type: ContentHostType;

  @Field(() => ID)
  contentId: string;
}
