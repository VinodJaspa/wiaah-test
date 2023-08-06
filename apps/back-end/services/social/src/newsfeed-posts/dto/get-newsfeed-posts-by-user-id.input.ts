import { Field, ID, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';
import { PostType } from 'prismaClient';

@InputType()
export class GetNewsfeedPostsByUserIdInput {
  @Field(() => ID)
  userId: string;

  @Field(() => PostType)
  type: PostType;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
