import {
  AttachmentInput,
  HashtagInput,
  PostLocationInput,
  PostMentionInput,
} from '../shared';
import { InputType, Field, registerEnumType, ID } from '@nestjs/graphql';
import { PostVisibility } from 'prismaClient';

registerEnumType(PostVisibility, { name: 'PostVisibility' });

@InputType()
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => [AttachmentInput])
  attachments: AttachmentInput[];

  @Field(() => [HashtagInput])
  tags: HashtagInput[];

  @Field(() => PostVisibility)
  visibility: PostVisibility;

  @Field(() => [PostMentionInput])
  mentions: PostMentionInput[];

  @Field(() => PostLocationInput, { nullable: true })
  location?: PostLocationInput;
}

@InputType()
export class CreateNewsfeedPostInput extends CreatePostInput {}
