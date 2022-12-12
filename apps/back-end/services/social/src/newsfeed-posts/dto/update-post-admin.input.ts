import { UpdateNewsfeedPostInput } from '@input';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePostAdminInput extends UpdateNewsfeedPostInput {
  @Field(() => ID)
  userId: string;
}
