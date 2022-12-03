import { CreateNewsfeedPostInput } from './create-post.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateNewsfeedPostInput extends PartialType(
  CreateNewsfeedPostInput,
) {
  @Field(() => ID)
  id: string;
}
