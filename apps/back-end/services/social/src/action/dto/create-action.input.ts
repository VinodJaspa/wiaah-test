import { PostLocationInput } from '@input';
import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { ActionType, CommentsVisibility } from 'prismaClient';
import { Upload, GraphQLUpload } from 'graphql-upload';

registerEnumType(ActionType, { name: 'ActionType' });
@InputType()
export class CreateActionInput {
  @Field(() => GraphQLUpload)
  src: Upload;

  @Field(() => GraphQLUpload)
  cover: Upload;

  @Field(() => PostLocationInput, { nullable: true })
  location?: PostLocationInput;

  @Field(() => CommentsVisibility, { nullable: true })
  commentsVisibility?: CommentsVisibility;

  @Field(() => [ActionType])
  allowedActions: ActionType[];
}
