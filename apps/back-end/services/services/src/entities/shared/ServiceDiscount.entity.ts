import { Directive, Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceDiscount {
  @Field(() => Float)
  value: number;

  @Field(() => Int)
  units: number;
}
