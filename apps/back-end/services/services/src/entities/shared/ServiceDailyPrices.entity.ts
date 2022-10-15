import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceDailyPrices {
  @Field(() => Int)
  0: number;

  @Field(() => Int)
  1: number;

  @Field(() => Int)
  2: number;

  @Field(() => Int)
  3: number;

  @Field(() => Int)
  4: number;

  @Field(() => Int)
  5: number;

  @Field(() => Int)
  6: number;
}
