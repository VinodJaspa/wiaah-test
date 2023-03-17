import {
  ServiceLocationInput,
  ServiceMetaInfoTranslationInput,
  ServicePolicyTranslatedInput,
  ServicePresentationInput,
} from '@dto';
import { InputType, Int, Field } from '@nestjs/graphql';
import { ServiceStatus } from 'prismaClient';
import { ServicePresentationsLength, TranslationsInput } from '@decorators';
import { ServiceContactInput } from '@hotel/dto';

@InputType()
export class CreateRestaurantInput {
  @Field(() => ServiceContactInput)
  contact: ServiceContactInput;

  @Field(() => Int)
  vat: number;

  @Field(() => ServiceStatus, { nullable: true })
  status?: ServiceStatus;

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
}
