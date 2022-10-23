import { SERVICE_MAX_VAT_PERCENT, SERVICE_MIN_VAT_PERCENT } from '@const';
import { ServicePresentationsLength } from '@decorators';
import {
  ServiceCancelationPolicyInput,
  ServiceLocationInput,
  ServiceMetaInfoTranslationInput,
  ServicePolicyTranslatedInput,
  ServicePresentationInput,
} from '@dto';
import { InputType, Field, Float } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { ServicePaymentMethods } from 'prismaClient';
import { HealthCenterDoctorInput } from './health-center-doctor.input';

@InputType()
export class CreateHealthCenterInput {
  @Field(() => Float)
  @Max(SERVICE_MAX_VAT_PERCENT)
  @Min(SERVICE_MIN_VAT_PERCENT)
  vat: number;

  @Field(() => [ServicePresentationInput])
  @ServicePresentationsLength()
  presentations: ServicePresentationInput[];

  @Field(() => [ServicePolicyTranslatedInput])
  policies: ServicePolicyTranslatedInput[];

  @Field(() => ServiceLocationInput)
  location: ServiceLocationInput;

  @Field(() => [ServiceMetaInfoTranslationInput])
  serviceMetaInfo: ServiceMetaInfoTranslationInput[];

  @Field(() => [ServicePaymentMethods])
  payment_methods: ServicePaymentMethods[];

  @Field(() => [ServiceCancelationPolicyInput])
  cancelationPolicies: ServiceCancelationPolicyInput[];

  @Field(() => [HealthCenterDoctorInput])
  doctors: HealthCenterDoctorInput[];
}
