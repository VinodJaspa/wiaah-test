import { InputType, Field, ID } from '@nestjs/graphql';
import { CreateMessageAttachmentInput } from './create-attachment.input';

@InputType()
export class CreateMessageInput {
  @Field(() => ID, { nullable: true })
  roomId?: string;

  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field(() => String)
  content: string;

  @Field(() => [CreateMessageAttachmentInput], { nullable: true })
  attachments?: CreateMessageAttachmentInput;
}
