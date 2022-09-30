import { PostMention } from '@entities';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCommentInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => [PostMention])
  mentions: PostMention[];
}
