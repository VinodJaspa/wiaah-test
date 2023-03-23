import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GetProfilePopularStoriesViewsInput {
  @Field(() => ID)
  profileId: string;

  @Field(() => ID)
  userId: string;

  @Field(() => String)
  date: string;
}
