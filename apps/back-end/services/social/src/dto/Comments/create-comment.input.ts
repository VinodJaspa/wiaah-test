import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { ContentHostType } from 'prismaClient';
import { AttachmentInput } from '@input';

registerEnumType(ContentHostType, { name: 'ContentHostType' });

@InputType()
export class CommentMentionInput {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  profileId: string;
}

@InputType()
export class CreateCommentInput {
  @Field(() => ContentHostType)
  contentType: ContentHostType;

  @Field(() => ID)
  contentId: string;

  @Field(() => ID)
  authorProfileId: string;

  @Field(() => ID)
  authorUserId: string;

  @Field(() => String)
  content: string;

  @Field(() => [CommentMentionInput])
  mentions: CommentMentionInput[];

  @Field(() => [AttachmentInput])
  attachments: AttachmentInput[];
}
