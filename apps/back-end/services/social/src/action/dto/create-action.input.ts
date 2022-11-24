import { AttachmentInput, PostLocationInput } from '@input';
import { InputType, Int, Field } from '@nestjs/graphql';
import { CommentsVisibility } from 'prismaClient';

@InputType()
export class CreateActionInput {
  @Field(() => AttachmentInput)
  attachment: AttachmentInput;

  @Field(() => PostLocationInput, { nullable: true })
  location?: PostLocationInput;

  @Field(() => CommentsVisibility, { nullable: true })
  commentsVisibility?: CommentsVisibility;
}
