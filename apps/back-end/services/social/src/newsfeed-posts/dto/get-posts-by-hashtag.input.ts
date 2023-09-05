import { Field, InputType } from '@nestjs/graphql';
import { GqlCursorPaginationInput } from 'nest-utils';
import { PostType } from 'prismaClient';

@InputType()
export class GetPostsByHashtagInput extends GqlCursorPaginationInput {
  @Field(() => String)
  hashtag: string;

  @Field(() => PostType)
  postType: PostType;
}
