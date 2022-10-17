import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ServiceDiscountInput {
  @Field(() => Int)
  value: number;

  @Field(() => Int)
  units: number;
}
