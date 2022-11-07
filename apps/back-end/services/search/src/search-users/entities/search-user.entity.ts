import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from './extends';

@ObjectType()
export class SearchUsers {
  @Field(() => [ID])
  usersIds: string[];

  @Field(() => [User], { nullable: true })
  users?: User[];
}
