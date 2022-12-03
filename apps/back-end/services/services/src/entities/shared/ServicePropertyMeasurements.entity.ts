import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServicePropertyMeasurements {
  @Field(() => Int)
  inFeet: number;

  @Field(() => Int)
  inMeter: number;
}
