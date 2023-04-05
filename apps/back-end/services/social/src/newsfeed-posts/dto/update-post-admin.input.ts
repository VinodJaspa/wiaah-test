import { UpdateNewsfeedPostInput } from '@input';
import { Field, ID, InputType } from '@nestjs/graphql';
import { PostVisibility } from 'prismaClient';

@InputType()
export class UpdatePostAdminInput extends UpdateNewsfeedPostInput {
  @Field(() => ID)
  userId: string;

  @Field(() => PostVisibility, { nullable: true })
  visibility?: PostVisibility;
}
