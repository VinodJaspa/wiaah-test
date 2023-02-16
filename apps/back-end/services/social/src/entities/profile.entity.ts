import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { CreateGqlPaginatedResponse, CreateGqlResponse } from 'nest-utils';
import { ActiveStatus, ProfileVisibility } from 'prismaClient';
import { Account, Follow } from '@entities';

registerEnumType(ProfileVisibility, { name: 'ProfileVisibility' });
registerEnumType(ActiveStatus, { name: 'ActiveStatus' });

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
export class Profile {
  @Field(() => Account, { nullable: true })
  user?: Account;

  @Field(() => ID)
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

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

  @Field(() => String)
  coverPhoto: string;

  @Field(() => Int)
  followers: number;

  @Field(() => [Follow], { nullable: true })
  followingData?: Follow[];

  @Field(() => Int)
  following: number;

  @Field(() => [Follow], { nullable: true })
  followersData?: Follow[];

  @Field(() => Int)
  publications: number;

  @Field(() => String)
  profession: string;

  @Field(() => ProfileVisibility)
  visibility: ProfileVisibility;

  @Field(() => Boolean)
  verified: boolean;

  @Field(() => Int)
  visits: number;
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
