import { Account } from '@entities';
import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';

// @ObjectType()
// @Directive('@extends')
// @Directive('@key(fields:"id")')
// export class Account {
//   @Field(() => ID)
//   @Directive('@external')
//   id: string;
// }

@ObjectType()
export class FriendSuggestion {
  @Field(() => [Account])
  accounts: Account[];
}
