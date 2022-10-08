import { PostMention } from '@entities';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
class updateCommentInput {
  @Field(() => String)
  content: string;

  @Field(() => [PostMention])
  mentions: PostMention[];
}

@InputType()
export class UpdateCommentInput extends PartialType(updateCommentInput) {
  @Field(() => ID)
  id: string;
}
