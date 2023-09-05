import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreatePinnedContentInput {
  @Field(() => ID)
  contentId: string;

  @Field(() => ID)
  userId: string;
}
