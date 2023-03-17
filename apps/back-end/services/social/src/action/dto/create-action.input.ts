import { PostLocationInput } from '@input';
import { InputType, Field } from '@nestjs/graphql';
import { ActionType, CommentsVisibility } from 'prismaClient';
import { Upload } from 'graphql-upload';

@InputType()
export class CreateActionInput {
  @Field(() => Upload)
  src: Upload;

  @Field(() => Upload)
  cover: Upload;

  @Field(() => PostLocationInput, { nullable: true })
  location?: PostLocationInput;

  @Field(() => CommentsVisibility, { nullable: true })
  commentsVisibility?: CommentsVisibility;

  @Field(() => [ActionType])
  allowedAction: ActionType[];
}
