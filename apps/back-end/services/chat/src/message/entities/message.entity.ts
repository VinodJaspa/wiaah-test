import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { MessageAttachmentType } from '@prisma-client';
@ObjectType()
export class ChatMessageSeenBy {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  seenAt: Date;
}

@ObjectType()
export class ChatMessage {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  roomId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  content: string;

  @Field(() => [MessageAttachment])
  attachments: MessageAttachment[];

  @Field(() => [ID])
  mentionsUserIds: string[];

  @Field(() => [ChatMessageSeenBy])
  seenBy: ChatMessageSeenBy[];
}

@ObjectType()
export class MessageAttachment {
  @Field(() => ID)
  id: string;

  @Field(() => MessageAttachmentType)
  type: MessageAttachmentType;

  @Field(() => String)
  src: string;
}
