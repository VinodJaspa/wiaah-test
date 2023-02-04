import { Directive, Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceCashback {
  @Field(() => Float)
  value: number;

  @Field(() => Int)
  units: number;
}
