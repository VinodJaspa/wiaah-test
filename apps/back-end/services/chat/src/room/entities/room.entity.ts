import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { ChatMessage } from '@message';
import { RoomTypes } from '@prisma-client';
import { User } from './extends';

registerEnumType(RoomTypes, { name: 'RoomTypes' });

@ObjectType()
export class Room {
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

  // @Field(() => [User], { nullable: true })
  members?: User[];

  @Field(() => [ChatMessage], { nullable: true })
  messages?: ChatMessage[];
}
