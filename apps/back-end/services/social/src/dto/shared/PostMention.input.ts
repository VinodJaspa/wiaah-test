import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class PostMentionInput {
  @Field(() => ID)
  userId: string;
}
