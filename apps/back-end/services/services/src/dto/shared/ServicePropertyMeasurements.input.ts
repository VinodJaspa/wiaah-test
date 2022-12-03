import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ServicePropertyMeasurementsInput {
  @Field(() => Int)
  inFeet: number;

  @Field(() => Int)
  inMeter: number;
}
