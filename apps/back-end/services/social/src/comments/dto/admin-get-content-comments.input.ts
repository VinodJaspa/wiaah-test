import { Field, ID, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';
import { ContentHostType } from 'prismaClient';

@InputType()
export class AdminGetContentCommentsInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;

  @Field(() => ID)
  contentId: string;

  @Field(() => ContentHostType)
  contentType: ContentHostType;
}
