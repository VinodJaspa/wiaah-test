import { ServiceCancelationPolicy, ServicePresentation } from '@entities';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { VehicleProperties } from './vehicleProperties.entity';

@ObjectType()
export class Vehicle {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => [ServicePresentation])
  presentations: ServicePresentation[];

  @Field(() => String)
  brand: string;

  @Field(() => String)
  model: string;

  @Field(() => Int)
  price: number;

  @Field(() => [ServiceCancelationPolicy])
  cancelationPolicies: ServiceCancelationPolicy[];

  @Field(() => VehicleProperties)
  properties: VehicleProperties;
}
