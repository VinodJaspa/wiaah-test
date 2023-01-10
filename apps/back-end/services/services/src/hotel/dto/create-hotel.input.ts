import { ServicePresentationsLength, TranslationsInput } from '@decorators';
import {
  ServiceLocationInput,
  ServiceMetaInfoTranslationInput,
  ServicePresentationInput,
} from '@dto';
import { InputType, Field } from '@nestjs/graphql';
import { ServicePolicyTranslatedInput } from '@dto';
import { HotelRoomInput } from './hotel-room.input';

@InputType()
export class ServiceContactInput {
  @Field(() => String)
  address: string;

  @Field(() => String)
  country: string;

  @Field(() => String, { nullable: true })
  state: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;
}

@InputType()
export class CreateHotelInput {
  @Field(() => ServiceContactInput)
  contact: ServiceContactInput;

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
