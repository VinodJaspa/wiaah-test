import {
  ServicePresentationsLength,
  TranslationsInput,
  ServiceVatPercent,
} from '@decorators';
import {
  ServiceCancelationPolicyInput,
  ServiceLocationInput,
  ServiceMetaInfoTranslationInput,
  ServicePaymentMethodInput,
  ServicePolicyTranslatedInput,
  ServicePresentationInput,
  TranslationTextInput,
} from '@dto';
import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { ServiceTypeOfSeller } from 'prismaClient';
import { CreateBeautyCenterTreatmentInput } from './create-beauty-center-treatment.input';

@InputType()
export class CreateBeautyCenterInput {
  @Field(() => Float)
  @ServiceVatPercent()
  vat: number;

  @Field(() => ID)
  beauty_center_typeId: string;

  @Field(() => [TranslationTextInput])
  @TranslationsInput()
  title: TranslationTextInput[];

  @Field(() => ServiceLocationInput)
  location: ServiceLocationInput;

  @Field(() => [ServicePresentationInput])
  @ServicePresentationsLength()
  presentations: ServicePresentationInput[];

  @Field(() => [ServicePolicyTranslatedInput])
  @TranslationsInput()
  policies: ServicePolicyTranslatedInput[];

  @Field(() => [ServiceMetaInfoTranslationInput])
  @TranslationsInput()
  serviceMetaInfo: ServiceMetaInfoTranslationInput[];

  @Field(() => [ServicePaymentMethodInput])
  payment_methods: ServicePaymentMethodInput[];

  @Field(() => [ServiceCancelationPolicyInput])
  cancelationPolicies: ServiceCancelationPolicyInput[];

  @Field(() => ServiceTypeOfSeller)
  type_of_seller: ServiceTypeOfSeller;

  @Field(() => [CreateBeautyCenterTreatmentInput])
  treatments: CreateBeautyCenterTreatmentInput[];
}
