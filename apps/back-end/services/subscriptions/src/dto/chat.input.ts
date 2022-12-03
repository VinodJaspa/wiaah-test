import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class JoinRoomInput {
  @Field(() => ID)
  roomId: string;
}
