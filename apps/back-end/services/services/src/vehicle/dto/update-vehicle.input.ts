import { CreateVehicleServiceInput } from './create-vehicle-service.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateVehicleInput extends PartialType(CreateVehicleServiceInput) {
  @Field(() => ID)
  id: string;
}
