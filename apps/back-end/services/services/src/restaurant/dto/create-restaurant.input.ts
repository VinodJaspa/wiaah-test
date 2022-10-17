import {
  ServiceMetaInfoInput,
  ServiceMetaInfoTranslationInput,
  ServicePolicyTranslatedInput,
  ServicePresentationInput,
} from '@dto';
import { InputType, Int, Field } from '@nestjs/graphql';
import { ServicePaymentMethods, ServiceStatus } from 'prismaClient';
import { RestaurantMenuInput } from '@restaurant';

@InputType()
export class CreateRestaurantInput {
  @Field(() => Int)
  vat: number;

  @Field(() => Int)
  cancelation_fee: number;

  @Field(() => ServiceStatus)
  status: ServiceStatus;

  @Field(() => [ServicePresentationInput])
  presentations: ServicePresentationInput[];

  @Field(() => [ServicePolicyTranslatedInput])
  policies: ServicePolicyTranslatedInput;

  @Field(() => [ServiceMetaInfoTranslationInput])
  serviceMetaInfo: ServiceMetaInfoTranslationInput[];

  @Field(() => ServicePaymentMethods)
  payment_methods: ServicePaymentMethods;

  @Field(() => [RestaurantMenuInput])
  menus: RestaurantMenuInput[];

  @Field(() => String)
  establishmentType: string;

  @Field(() => String)
  cuisinesType: string;

  @Field(() => String)
  setting_and_ambiance: string;

  @Field(() => Int)
  michelin_guide_stars: number;
}
