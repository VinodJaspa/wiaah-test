import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceDailyPrices {
  @Field(() => Int)
  mo: number;

  @Field(() => Int)
  tu: number;

  @Field(() => Int)
  we: number;

  @Field(() => Int)
  th: number;

  @Field(() => Int)
  fr: number;

  @Field(() => Int)
  sa: number;

  @Field(() => Int)
  su: number;
}
