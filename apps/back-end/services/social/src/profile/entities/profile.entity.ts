import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { ProfileVisibility } from 'prismaClient';

registerEnumType(ProfileVisibility, { name: 'ProfileVisibility' });

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => String)
  bio: string;

  @Field(() => String)
  photo: string;

  @Field(() => Int)
  followers: number;

  @Field(() => [String])
  followersIds: string[];

  @Field(() => Int)
  following: number;

  @Field(() => [String])
  followingIds: string[];

  @Field(() => Int)
  publications: number;

  @Field(() => [String])
  postsIds: string[];

  @Field(() => String)
  profession: string;

  @Field(() => ProfileVisibility)
  visibility: ProfileVisibility;
}
