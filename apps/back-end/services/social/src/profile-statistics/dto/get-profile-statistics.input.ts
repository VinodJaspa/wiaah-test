import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetProfileStatisticsInput {
  @Field(() => ID)
  profileId: string;

  @Field(() => ID)
  userId: string;

  @Field(() => Int)
  sinceHours: number;
}
