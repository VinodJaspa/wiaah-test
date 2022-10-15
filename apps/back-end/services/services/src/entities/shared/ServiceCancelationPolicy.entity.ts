import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceCancelationPolicy {
  @Field(() => Int)
  duration: number;

  @Field(() => Int)
  cost: number;
}
