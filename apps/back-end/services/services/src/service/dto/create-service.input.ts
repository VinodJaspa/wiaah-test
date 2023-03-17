import { CreateBeautyCenterTreatmentInput } from '@beauty-center';
import { SERVICE_MAX_VAT_PERCENT, SERVICE_MIN_VAT_PERCENT } from '@const';
import { ServicePresentationsLength, TranslationsInput } from '@decorators';
import {
  ServiceCancelationPolicyInput,
  ServiceLocationInput,
  ServiceMetaInfoTranslationInput,
  ServicePolicyTranslatedInput,
  ServicePresentationInput,
} from '@dto';
import { HealthCenterDoctorInput } from '@health-center';
import { HotelRoomInput } from '@hotel/dto/hotel-room.input';
import { InputType, Field, ID, Int, Float } from '@nestjs/graphql';
import { RestaurantMenuInput } from '@restaurant';
import { CreateVehicleInput } from '@vehicle-service/dto/create-vehicle.input';
import { Max, Min } from 'class-validator';
import {
  ServicePaymentMethods,
  ServiceStatus,
  ServiceType,
  ServiceTypeOfSeller,
} from 'prismaClient';

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

import { GraphQLUpload, Upload } from 'graphql-upload';

export function IsPropertyEqual(
  property: string,
  value: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPropertyEqual',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property, value],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName, expectedValue] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          if (relatedValue !== expectedValue && !value) return true;

          if (relatedValue === expectedValue && !!value) return true;

          return false;
        },
      },
    });
  };
}

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
export class CreateServiceInput {
  @Field(() => ServiceType)
  type: ServiceType;

  @Field(() => ServiceStatus)
  status: ServiceStatus;

  @Field(() => ServiceContactInput)
  contact: ServiceContactInput;

  @Field(() => [GraphQLUpload])
  @ServicePresentationsLength()
  presentations: Upload[];

  @Field(() => ServiceLocationInput)
  location: ServiceLocationInput;

  @Field(() => [ServicePolicyTranslatedInput])
  @TranslationsInput()
  policies: ServicePolicyTranslatedInput[];

  @Field(() => [ServiceMetaInfoTranslationInput])
  @TranslationsInput()
  serviceMetaInfo: ServiceMetaInfoTranslationInput[];

  @Field(() => [ServicePaymentMethods])
  payment_methods: ServicePaymentMethods[];

  @Field(() => ServiceTypeOfSeller)
  type_of_seller: ServiceTypeOfSeller;

  @Field(() => [ServiceCancelationPolicyInput])
  cancelationPolicies: ServiceCancelationPolicyInput[];

  @Field(() => Float)
  @Max(SERVICE_MAX_VAT_PERCENT)
  @Min(SERVICE_MIN_VAT_PERCENT)
  vat: number;

  @Field(() => [HotelRoomInput], { nullable: true })
  @IsPropertyEqual('type', ServiceType.hotel)
  rooms?: HotelRoomInput[];

  @Field(() => [RestaurantMenuInput], { nullable: true })
  @IsPropertyEqual('type', ServiceType.restaurant)
  menus?: RestaurantMenuInput[];

  @Field(() => ID, { nullable: true })
  @IsPropertyEqual('type', ServiceType.restaurant)
  establishmentTypeId?: string;

  @Field(() => ID, { nullable: true })
  @IsPropertyEqual('type', ServiceType.restaurant)
  cuisinesTypeId?: string;

  @Field(() => ID, { nullable: true })
  @IsPropertyEqual('type', ServiceType.restaurant)
  setting_and_ambianceId?: string;

  @Field(() => Int, { nullable: true })
  @IsPropertyEqual('type', ServiceType.restaurant)
  michelin_guide_stars?: number;

  @Field(() => [HealthCenterDoctorInput], { nullable: true })
  @IsPropertyEqual('type', ServiceType.health_center)
  doctors?: HealthCenterDoctorInput[];

  @Field(() => [CreateBeautyCenterTreatmentInput], { nullable: true })
  @IsPropertyEqual('type', ServiceType.beauty_center)
  treatments?: CreateBeautyCenterTreatmentInput[];

  @Field(() => [CreateVehicleInput], { nullable: true })
  @IsPropertyEqual('type', ServiceType.vehicle)
  vehicles?: CreateVehicleInput[];
}
