import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class PrivacySettings {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => Boolean)
  privateAccount: boolean;

  @Field(() => Boolean)
  hideLikesNum: boolean;

  @Field(() => Boolean)
  hideCommentsNum: boolean;

  @Field(() => Boolean)
  hideViewsNum: boolean;
}
