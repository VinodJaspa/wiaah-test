import { Field, ID, InputType } from '@nestjs/graphql';
import { ContentHostType } from 'prismaClient';

@InputType()
export class CreateReactionInput {
  @Field(() => ID)
  contentId: string;

  @Field(() => ContentHostType)
  contentType: ContentHostType;
}
