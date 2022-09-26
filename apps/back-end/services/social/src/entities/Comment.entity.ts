import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Attachment, Profile } from '@entities';
import { ContentHostType } from 'prismaClient';

registerEnumType(ContentHostType, { name: 'ContentHostType' });

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: string;

  @Field(() => ContentHostType)
  hostType: ContentHostType;

  @Field(() => ID)
  hostId: string;

  @Field(() => Profile)
  author: Profile;

  @Field(() => String)
  authorId: string;

  @Field(() => [Attachment])
  attachments: Attachment[];

  @Field(() => String)
  content: string;

  @Field(() => Date)
  commentedAt: Date;
}
