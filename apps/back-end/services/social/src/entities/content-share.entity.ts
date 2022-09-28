import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ContentHostType } from 'prismaClient';
import { Profile } from '@entities';
import { CreateGqlPaginatedResponse } from 'nest-utils';

@ObjectType()
export class ContentShare {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  hostId: string;

  @Field(() => ContentHostType)
  hostType: ContentHostType;

  @Field(() => Profile, { nullable: true })
  sharedBy?: Profile;

  @Field(() => ID)
  sharedByProfileId: string;

  @Field(() => ID)
  sharedByUserId: string;

  @Field(() => Date)
  sharedAt: Date;
}

@ObjectType()
export class ContentSharePaginationResponse extends CreateGqlPaginatedResponse(
  ContentShare,
) {}
