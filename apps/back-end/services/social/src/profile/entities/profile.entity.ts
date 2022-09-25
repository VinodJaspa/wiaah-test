import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { CreateGqlPaginatedResponse, CreateGqlResponse } from 'nest-utils';
import { ActiveStatus, ProfileVisibility } from 'prismaClient';

registerEnumType(ProfileVisibility, { name: 'ProfileVisibility' });
registerEnumType(ActiveStatus, { name: 'ActiveStatus' });

@ObjectType()
export class FollowData {
  @Field(() => ID)
  id: string;
  @Field(() => Date)
  followedAt: Date;
}

@ObjectType()
export class BlockedUser {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  blockerProfileId: string;

  @Field(() => ID)
  blockedProfileId: string;

  @Field(() => Date)
  blockedAt: Date;
}

@ObjectType()
export class ContentLike {}

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  // @Field(() => ID)
  // ownerId: string;

  // @Field(() => Date)
  // createdAt: Date;

  // @Field(() => Date)
  // updatedAt: Date;

  @Field(() => String)
  username: string;

  @Field(() => ActiveStatus)
  activeStatus: ActiveStatus;

  @Field(() => Date)
  lastActive: Date;

  @Field(() => String)
  bio: string;

  @Field(() => String)
  photo: string;

  @Field(() => Int)
  followers: number;

  @Field(() => [FollowData])
  followersData: FollowData[];

  @Field(() => Int)
  following: number;

  @Field(() => [FollowData])
  followingData: FollowData[];

  @Field(() => Int)
  publications: number;

  @Field(() => [String])
  postsIds: string[];

  @Field(() => String)
  profession: string;

  @Field(() => ProfileVisibility)
  visibility: ProfileVisibility;
}

@ObjectType()
export class BlockedUserPaginationResponse extends CreateGqlPaginatedResponse(
  BlockedUser,
) {}

@ObjectType()
export class ProfilePaginatedResponse extends CreateGqlPaginatedResponse(
  Profile,
) {}

@ObjectType()
export class ProfileResponse extends CreateGqlResponse(Profile) {}
