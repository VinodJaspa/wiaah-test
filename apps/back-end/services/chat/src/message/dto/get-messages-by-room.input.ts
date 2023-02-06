import { Field, ID, InputType } from '@nestjs/graphql';
import { GqlCursorPaginationInput } from 'nest-utils';

@InputType()
export class GetMessagesByRoomIdInput {
  @Field(() => GqlCursorPaginationInput)
  pagination: GqlCursorPaginationInput;

  @Field(() => ID)
  roomId: string;
}
