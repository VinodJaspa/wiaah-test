import { ServiceVatPercent } from '@decorators';
import {
  ServiceLocationInput,
  ServicePresentationInput,
  ServicePolicyTranslatedInput,
  ServiceMetaInfoTranslationInput,
  ServicePaymentMethodInput,
} from '@dto';
import { InputType, Field, PartialType, ID, Float } from '@nestjs/graphql';

import { CreateVehicleInput } from './create-vehicle.input';

@InputType()
export class UpdateVehicleInput extends PartialType(CreateVehicleInput) {
  @Field(() => ID)
  id: string;
}

@InputType()
class UpdateVehicleServiceOptionalInput {
  @Field(() => Float)
  @ServiceVatPercent()
  vat: number;

  @Field(() => ServiceLocationInput)
  location: ServiceLocationInput;

  @Field(() => [ServicePresentationInput])
  presentations: ServicePresentationInput[];

  @Field(() => [ServicePolicyTranslatedInput])
  policies: ServicePolicyTranslatedInput[];

  @Field(() => [ServiceMetaInfoTranslationInput])
  serviceMetaInfo: ServiceMetaInfoTranslationInput[];

  @Field(() => [ServicePaymentMethodInput])
  payment_methods: ServicePaymentMethodInput[];

  @Field(() => [UpdateVehicleInput])
  vehicles?: UpdateVehicleInput[];
}

@InputType()
export class UpdateVehicleServiceInput extends PartialType(
  UpdateVehicleServiceOptionalInput,
) {
  @Field(() => ID)
  id: string;
}
