import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { ContentHostType } from 'prismaClient';
import { AttachmentInput } from '@input';

registerEnumType(ContentHostType, { name: 'ContentHostType' });

@InputType()
export class CreateCommentInput {
  @Field(() => ContentHostType)
  contentType: ContentHostType;

  @Field(() => ID)
  contentId: string;

  @Field(() => ID)
  authorProfileId: string;

  @Field(() => String)
  content: string;

  @Field(() => [String])
  mentions: string[];

  @Field(() => [AttachmentInput])
  attachments: AttachmentInput[];
}
