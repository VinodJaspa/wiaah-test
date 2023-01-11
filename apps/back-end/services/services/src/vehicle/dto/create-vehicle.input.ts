import { ServicePresentationsLength, TranslationsInput } from '@decorators';
import {
  ServiceCancelationPolicyInput,
  ServicePresentationInput,
  TranslationTextInput,
} from '@dto';
import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateVehiclePropertiesInput {
  @Field(() => Int)
  seats: number;

  @Field(() => Int)
  windows: number;

  @Field(() => Int)
  maxSpeedInKm: number;

  @Field(() => Int)
  lugaggeCapacity: number;

  @Field(() => Boolean)
  gpsAvailable: boolean;

  @Field(() => Boolean)
  airCondition: boolean;
}

@InputType()
export class CreateVehicleInput {
  @Field(() => ID)
  typeId: string;

  @Field(() => [TranslationTextInput])
  @TranslationsInput()
  title: TranslationTextInput[];

  @Field(() => [ServicePresentationInput])
  @ServicePresentationsLength()
  presentations: ServicePresentationInput[];

  @Field(() => [ServiceCancelationPolicyInput])
  cancelationPolicies: ServiceCancelationPolicyInput[];

  @Field(() => String)
  brand: string;

  @Field(() => String)
  model: string;

  @Field(() => Float)
  price: number;

  @Field(() => CreateVehiclePropertiesInput)
  properties: CreateVehiclePropertiesInput;

  @Field(() => Float)
  insurance: number;
}
