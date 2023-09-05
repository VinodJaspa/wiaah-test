import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Profile } from '@entities';

@ObjectType()
export class Follow {
  @Field(() => ID)
  id: string;

  // @Field(() => Profile, { nullable: true })
  // followerProfile?: Profile;

  @Field(() => ID)
  followerUserId: string;

  // @Field(() => Profile, { nullable: true })
  // followingProfile?: Profile;

  @Field(() => ID)
  followingUserId: string;

  @Field(() => Date)
  followedAt: Date;
}
