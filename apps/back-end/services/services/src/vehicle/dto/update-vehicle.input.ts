import { CreateVehicleServiceInput } from './create-vehicle-service.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVehicleInput extends PartialType(CreateVehicleServiceInput) {
  @Field(() => Int)
  id: number;
}
