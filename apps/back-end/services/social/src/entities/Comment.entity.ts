import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Attachment, Profile } from '@entities';
import { ContentHostType } from 'prismaClient';
import { CreateGqlPaginatedResponse } from 'nest-utils';

registerEnumType(ContentHostType, { name: 'ContentHostType' });

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: string;

  @Field(() => ContentHostType)
  hostType: ContentHostType;

  @Field(() => ID)
  hostId: string;

  @Field(() => Profile, { nullable: true })
  author?: Profile;

  @Field(() => String)
  authorProfileId: string;

  @Field(() => String)
  userId: string;

  @Field(() => [Attachment])
  attachments: Attachment[];

  @Field(() => String)
  content: string;

  @Field(() => Date)
  commentedAt: Date;
}

@ObjectType()
export class PaginationCommentsResponse extends CreateGqlPaginatedResponse(
  Comment,
) {}
