import {
  CreateBeautyCenterInput,
  UpdateBeautyCenterInput,
} from '@beauty-center';
import { ServicePresentationsLength, TranslationsInput } from '@decorators';
import {
  ServicePresentationInput,
  ServiceLocationInput,
  ServicePolicyTranslatedInput,
  ServiceMetaInfoTranslationInput,
} from '@dto';
import {
  CreateHealthCenterInput,
  UpdateHealthCenterInput,
} from '@health-center';
import { CreateHotelInput } from '@hotel/dto';
import { HotelRoomInput } from '@hotel/dto/hotel-room.input';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantInput, UpdateRestaurantInput } from '@restaurant';
import { UpdateVehicleInput } from '@vehicle-service';
import { CreateVehicleInput } from '@vehicle-service/dto/create-vehicle.input';

@InputType()
export class UpdateHotelRoomAdminInput extends PartialType(HotelRoomInput) {
  @Field(() => ID)
  id: string;
}

@InputType()
class input {
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

  @Field(() => [UpdateHotelRoomAdminInput])
  rooms: UpdateHotelRoomAdminInput[];
}

@InputType()
export class updateHotelAdminInput extends PartialType(input) {
  @Field(() => ID)
  id: string;
}

@InputType()
export class updateRestaurantAdminInput extends UpdateRestaurantInput {}

@InputType()
export class updateHealthCenterAdminInput extends UpdateHealthCenterInput {}

@InputType()
export class updateBeautyCenterAdminInput extends UpdateBeautyCenterInput {
  @Field(() => ID)
  id: string;
}

@InputType()
export class updateVehicleAdminInput extends UpdateVehicleInput {}
