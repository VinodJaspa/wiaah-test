import { ServiceVatPercent } from '@decorators';
import {
  ServiceLocationInput,
  ServiceMetaInfoTranslationInput,
  ServicePaymentMethodInput,
  ServicePolicyTranslatedInput,
  ServicePresentationInput,
} from '@dto';
import { ServiceContactInput } from '@hotel/dto';
import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { CreateVehicleInput } from './create-vehicle.input';

@InputType()
export class CreateVehicleServiceInput {
  @Field(() => ServiceContactInput)
  contact: ServiceContactInput;

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

  @Field(() => [CreateVehicleInput])
  vehicles: CreateVehicleInput[];
}
