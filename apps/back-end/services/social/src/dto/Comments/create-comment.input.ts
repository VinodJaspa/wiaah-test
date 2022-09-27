import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { ContentHostType } from 'prismaClient';
import { AttachmentInput } from '@input';

registerEnumType(ContentHostType, { name: 'ContentHostType' });

@InputType()
export class CreateCommentInput {
  @Field(() => ContentHostType)
  hostType: ContentHostType;

  @Field(() => ID)
  hostId: string;

  @Field(() => ID)
  authorProfileId: string;

  @Field(() => String)
  content: string;

  @Field(() => [String])
  mentions: string[];

  @Field(() => [AttachmentInput])
  attachments: AttachmentInput[];
}
