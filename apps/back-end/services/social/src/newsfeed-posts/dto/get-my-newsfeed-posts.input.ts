import { Field, ID, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';
import { PostType } from 'prismaClient';

@InputType()
export class GetMyNewsfeedPostsInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;

  @Field(() => PostType)
  type: PostType;
}
