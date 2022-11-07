import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class ChatRoom {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class ChatMessage {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}
