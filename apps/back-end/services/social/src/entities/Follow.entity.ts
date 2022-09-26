import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Profile } from '@entities';

@ObjectType()
export class Follow {
  @Field(() => ID)
  id: string;

  @Field(() => Profile, { nullable: true })
  followerProfile?: Profile;

  @Field(() => ID)
  followerProfileId: string;

  @Field(() => Profile, { nullable: true })
  followingProfile?: Profile;

  @Field(() => ID)
  followingProfileId: string;

  @Field(() => Date)
  followedAt: Date;
}
