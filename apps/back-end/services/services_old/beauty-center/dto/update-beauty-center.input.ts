import { InputType, Field, PartialType, ID, Float } from '@nestjs/graphql';
import { CreateBeautyCenterTreatmentInput } from './create-beauty-center-treatment.input';
import {
  TranslationTextInput,
  ServicePresentationInput,
  ServicePolicyTranslatedInput,
  ServiceMetaInfoTranslationInput,
  ServicePaymentMethodInput,
  ServiceCancelationPolicyInput,
} from '@dto';
import { ServiceTypeOfSeller } from 'prismaClient';

@InputType()
export class UpdateBeautyCenterTreatmentInput extends PartialType(
  CreateBeautyCenterTreatmentInput,
) {
  @Field(() => ID)
  id: string;
}

@InputType()
class UpdateInput {
  @Field(() => Float)
  vat: number;

  @Field(() => ID)
  beauty_center_typeId: string;

  @Field(() => [TranslationTextInput])
  title: TranslationTextInput[];

  @Field(() => [ServicePresentationInput])
  presentations: ServicePresentationInput[];

  @Field(() => [ServicePolicyTranslatedInput])
  policies: ServicePolicyTranslatedInput[];

  @Field(() => [ServiceMetaInfoTranslationInput])
  serviceMetaInfo: ServiceMetaInfoTranslationInput[];

  @Field(() => [ServicePaymentMethodInput])
  payment_methods: ServicePaymentMethodInput[];

  @Field(() => [ServiceCancelationPolicyInput])
  cancelationPolicies: ServiceCancelationPolicyInput[];

  @Field(() => ServiceTypeOfSeller)
  type_of_seller: ServiceTypeOfSeller;

  @Field(() => [UpdateBeautyCenterTreatmentInput])
  treatments: UpdateBeautyCenterTreatmentInput[];
}

@InputType()
export class UpdateBeautyCenterInput extends PartialType(UpdateInput) {
  @Field(() => ID)
  id: string;
}
