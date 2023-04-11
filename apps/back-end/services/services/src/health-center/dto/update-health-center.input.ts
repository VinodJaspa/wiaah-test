import {
  InputType,
  Field,
  Int,
  Float,
  ID,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { SERVICE_MAX_VAT_PERCENT, SERVICE_MIN_VAT_PERCENT } from '@const';
import { Max, Min } from 'class-validator';
import { ServicePresentationsLength } from '@decorators';
import {
  ServiceCancelationPolicyInput,
  ServiceMetaInfoTranslationInput,
  ServicePolicyTranslatedInput,
  ServicePresentationInput,
} from '@dto';
import { ServicePaymentMethods, ServiceStatus } from 'prismaClient';
registerEnumType(ServiceStatus, { name: 'ServiceStatus' });
@InputType()
class updateHealthCenterInput {
  @Field(() => Float)
  @Max(SERVICE_MAX_VAT_PERCENT)
  @Min(SERVICE_MIN_VAT_PERCENT)
  vat: number;

  @Field(() => [ServicePresentationInput])
  @ServicePresentationsLength()
  presentations: ServicePresentationInput[];

  @Field(() => [ServicePolicyTranslatedInput])
  policies: ServicePolicyTranslatedInput[];

  @Field(() => [ServiceMetaInfoTranslationInput])
  serviceMetaInfo: ServiceMetaInfoTranslationInput[];

  @Field(() => [ServicePaymentMethods])
  payment_methods: ServicePaymentMethods[];

  @Field(() => [ServiceCancelationPolicyInput])
  cancelationPolicies: ServiceCancelationPolicyInput[];

  @Field(() => ServiceStatus)
  status: ServiceStatus;
}
@InputType()
export class UpdateHealthCenterInput extends PartialType(
  updateHealthCenterInput,
) {
  @Field(() => ID)
  id: string;
}
