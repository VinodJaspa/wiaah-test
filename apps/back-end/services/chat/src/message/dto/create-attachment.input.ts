import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { MessageAttachmentType } from '@prisma-client';

registerEnumType(MessageAttachmentType, { name: 'MessageAttachmentType' });

@InputType()
export class CreateMessageAttachmentInput {
  @Field(() => ID)
  id: string;

  @Field(() => MessageAttachmentType)
  type: MessageAttachmentType;

  @Field(() => String)
  src: string;
}
