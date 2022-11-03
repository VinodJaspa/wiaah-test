import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { CreateMessageAttachmentInput } from './create-attachment.input';

@InputType()
export class CreateMessageInput {
  @Field(() => ID)
  roomId: string;

  @Field(() => String)
  content: string;

  @Field(() => [CreateMessageAttachmentInput])
  attachments: CreateMessageAttachmentInput;
}
