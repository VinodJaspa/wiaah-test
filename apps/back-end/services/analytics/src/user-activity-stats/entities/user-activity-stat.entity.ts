import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class UserActivityStats {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  activityScore: number;

  @Field(() => Date)
  lastActive: Date;

  @Field(() => Int)
  day_active_min: number;
}
