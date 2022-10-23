import { ServicePresentationsLength, TranslationsInput } from '@decorators';
import {
  ServiceLocationInput,
  ServiceMetaInfoTranslationInput,
  ServicePresentationInput,
} from '@dto';
import { InputType, Field } from '@nestjs/graphql';
import { ServicePolicyTranslatedInput } from 'src/dto/shared/ServicePolicies.input';
import { HotelRoomInput } from './hotel-room.input';

@InputType()
export class CreateHotelInput {
  @Field(() => [ServicePresentationInput])
  @ServicePresentationsLength()
  presentations: [ServicePresentationInput];

  @Field(() => ServiceLocationInput)
  location: ServiceLocationInput;

  @Field(() => [ServicePolicyTranslatedInput])
  @TranslationsInput()
  policies: ServicePolicyTranslatedInput[];

  @Field(() => [ServiceMetaInfoTranslationInput])
  @TranslationsInput()
  serviceMetaInfo: ServiceMetaInfoTranslationInput[];

  @Field(() => [HotelRoomInput])
  rooms: HotelRoomInput[];
}
