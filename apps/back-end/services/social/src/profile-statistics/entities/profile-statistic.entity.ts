import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProfileStatistics {
  @Field(() => Int)
  total_visits: number;

  @Field(() => Int)
  prev_total_visits: number;

  @Field(() => Int)
  total_followers: number;

  @Field(() => Int)
  prev_total_followers: number;

  @Field(() => Int)
  total_comments: number;

  @Field(() => Int)
  prev_total_comments: number;

  @Field(() => Int)
  total_saves: number;

  @Field(() => Int)
  prev_total_saves: number;
}
