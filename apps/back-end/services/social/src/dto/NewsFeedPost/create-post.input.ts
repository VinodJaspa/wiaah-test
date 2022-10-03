import { AttachmentInput, HashtagInput } from '@input';
import { InputType, Field, registerEnumType, ID } from '@nestjs/graphql';
import { PostVisibility } from 'prismaClient';

registerEnumType(PostVisibility, { name: 'PostVisibility' });

@InputType()
export class PostMentionInput {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  profileId: string;
}

@InputType()
export class PostLocationInput {
  @Field(() => String)
  city: string;

  @Field(() => String)
  country: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String, { nullable: true })
  state: string;
}

@InputType()
export class CreateNewsfeedPostInput {
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
