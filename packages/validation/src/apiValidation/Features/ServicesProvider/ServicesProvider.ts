import {
  CommonServiceDataSchema,
  ServiceCancelationPolicies,
} from "../../Features";
import {
  createApiResponseValidationSchema,
  DiscountUnits,
} from "../../SharedSchema";
import { object, string, number, array, boolean } from "yup";

export const PopularAmenitiesValidationSchema = object({
  name: string().required(),
  slug: string().required(),
});

export const HotelServiceProviderPolicicesValidationSchema = object({
  messageForClients: string().required(),
  checkin_checkout_terms: array().of(string()).min(0).required(),
}).required();

export const HotelPropertiesValidationSchema = object({});

export const HotelServiceProviderRoomValidationSchema =
  ServiceCancelationPolicies.concat(
    object({
      id: string().required(),
      thumbnails: array().of(string()).min(0).required(),
      title: string().required(),
      amenities: array().of(PopularAmenitiesValidationSchema).min(0).required(),
      price: number().required(),
      discount: DiscountUnits().required(),
      with_fees_and_taxes: boolean().required(),
      extras: array().of(string().required()).min(0).required(),
      includes: array().of(string().required()).min(0).required(),
      size: object({
        inMeter: number().required(),
        inFeet: number().required(),
      }).required(),
    }).required()
  );

export const HotelServiceDetailsValidationSchema =
  CommonServiceDataSchema.concat(
    object({
      pricePerNight: number().required(),
      serviceFee: number().required(),
      taxes: number().required(),
      vat: number().required().min(0).max(100).required(),
      rooms: array()
        .of(HotelServiceProviderRoomValidationSchema)
        .min(0)
        .required(),
      travelPeriod: object({
        arrival: string().required(),
        departure: string().required(),
      }).optional(),
      PopularAmenities: array()
        .of(PopularAmenitiesValidationSchema)
        .min(0)
        .required(),
    }).required()
  );

export const HotelServiceDetailsApiResponseValidationSchema =
  createApiResponseValidationSchema(
    HotelServiceDetailsValidationSchema
  ).required();
