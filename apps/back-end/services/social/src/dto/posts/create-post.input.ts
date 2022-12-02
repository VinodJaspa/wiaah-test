import {
  AttachmentInput,
  HashtagInput,
  PostLocationInput,
  PostTagInput,
} from '../shared';
import { InputType, Field, registerEnumType } from '@nestjs/graphql';
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
  hashtags: HashtagInput[];

  @Field(() => [PostTagInput])
  tags: PostTagInput[];

  @Field(() => PostVisibility, { nullable: true })
  visibility?: PostVisibility;

  @Field(() => PostLocationInput, { nullable: true })
  location?: PostLocationInput;
}

@InputType()
export class CreateNewsfeedPostInput extends CreatePostInput {}
