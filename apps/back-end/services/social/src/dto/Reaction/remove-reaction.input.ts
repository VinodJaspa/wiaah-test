import { Field, ID, InputType } from '@nestjs/graphql';
import { ContentHostType, ContentReactionType } from 'prismaClient';

@InputType()
export class RemoveReactionInput {
  @Field(() => ID)
  contentId: string;

  @Field(() => ContentHostType)
  contentType: ContentHostType;
}
