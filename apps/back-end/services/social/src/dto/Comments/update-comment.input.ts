import { PostMention } from '@entities';
import { CommentMentionInput } from '@input';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
class updateCommentInput {
  @Field(() => String)
  content: string;

  @Field(() => [CommentMentionInput])
  mentions: CommentMentionInput[];
}

@InputType()
export class UpdateCommentInput extends PartialType(updateCommentInput) {
  @Field(() => ID)
  id: string;
}
