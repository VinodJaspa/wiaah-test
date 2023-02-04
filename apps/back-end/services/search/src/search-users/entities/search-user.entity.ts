import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Account } from './extends';

@ObjectType()
export class SearchUsers {
  @Field(() => [ID])
  usersIds: string[];

  @Field(() => [Account], { nullable: true })
  users?: Account[];
}
