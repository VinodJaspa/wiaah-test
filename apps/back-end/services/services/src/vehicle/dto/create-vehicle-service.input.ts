import { ServiceVatPercent } from '@decorators';
import {
  ServiceCancelationPolicyInput,
  ServiceLocationInput,
  ServiceMetaInfoTranslationInput,
  ServicePaymentMethodInput,
  ServicePolicyTranslatedInput,
  ServicePresentationInput,
} from '@dto';
import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { CreateVehicleInput } from './create-vehicle.input';

@InputType()
export class CreateVehicleServiceInput {
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
