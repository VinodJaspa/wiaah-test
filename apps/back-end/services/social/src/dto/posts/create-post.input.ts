import { HashtagInput, PostLocationInput, PostTagInput } from '../shared';
import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { PostVisibility, CommentsVisibility } from 'prismaClient';

registerEnumType(PostVisibility, { name: 'PostVisibility' });
registerEnumType(CommentsVisibility, { name: 'CommentsVisibility' });

@InputType()
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => [String])
  attachments: string[];

  @Field(() => [HashtagInput])
  hashtags: HashtagInput[];

  @Field(() => [PostTagInput])
  tags: PostTagInput[];

  @Field(() => PostVisibility, { nullable: true })
  visibility?: PostVisibility;

  @Field(() => Boolean, { nullable: true })
  enableComments?: boolean;

  @Field(() => CommentsVisibility, { nullable: true })
  commentsVisibility?: CommentsVisibility;

  @Field(() => PostLocationInput, { nullable: true })
  location?: PostLocationInput;
}

@InputType()
export class CreateNewsfeedPostInput extends CreatePostInput {}
