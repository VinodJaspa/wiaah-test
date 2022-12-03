import { Account } from '@entities';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RecentStory {
  @Field(() => ID)
  userId: string;

  @Field(() => Boolean)
  newStory: boolean;

  @Field(() => Account, { nullable: true })
  user?: Account;
}
