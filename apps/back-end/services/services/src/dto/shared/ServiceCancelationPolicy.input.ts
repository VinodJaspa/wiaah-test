import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ServiceCancelationPolicyInput {
  @Field(() => Int)
  duration: number;

  @Field(() => Int)
  cost: number;
}
