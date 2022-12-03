import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceDiscount {
  @Field(() => Int)
  value: number;

  @Field(() => Int)
  units: number;
}
