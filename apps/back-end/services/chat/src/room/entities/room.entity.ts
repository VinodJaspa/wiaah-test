import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { RoomTypes } from '@prisma-client';

registerEnumType(RoomTypes, { name: 'RoomTypes' });

@ObjectType()
export class ChatRoom {
  @Field(() => ID)
  id: string;

  @Field(() => [ID])
  membersUserIds: string[];

  @Field(() => Int)
  unSeenMessages: number;

  @Field(() => RoomTypes)
  roomType: RoomTypes;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
