import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive("@keys(fields:'id')")
export class Account {
  @Field(() => ID)
  @Directive('@extends')
  id: string;
}

@ObjectType()
export class FriendSuggestion {
  @Field(() => [Account])
  accounts: Account[];
}
