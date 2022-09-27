import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ContentReactionType } from 'prismaClient';
import { Profile } from '@entities';
import { CreateGqlResponse } from 'nest-utils';

registerEnumType(ContentReactionType, { name: 'ContentReactionType' });

@ObjectType()
export class ContentReaction {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  hostId: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ContentReactionType)
  reactionType: ContentReactionType;

  @Field(() => Profile)
  reactedBy: Profile;

  @Field(() => ID)
  reactedByProfileId: string;

  @Field(() => Date)
  reactedAt: Date;
}

@ObjectType()
export class ContentReactionResponse extends CreateGqlResponse(
  ContentReaction,
) {}
