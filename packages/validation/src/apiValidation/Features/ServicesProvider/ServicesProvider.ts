import { CommonServiceDataSchema } from "../";
import { createApiResponseValidationSchema } from "../../SharedSchema";
import { object, string, number, array, mixed, boolean } from "yup";

export const PopularAmenitiesValidationSchema = object({
  name: string().required(),
  slug: string().required(),
}).required();

export const HotelServiceProviderPolicicesValidationSchema = object({
  messageForClients: string().required(),
  checkin_checkout_terms: array().of(string()).min(0).required(),
}).required();

export const HotelServiceProviderRoomValidationSchema = object({
  thumbnails: array().of(string()).min(0).required(),
  title: string().required(),
  amenities: array().of(PopularAmenitiesValidationSchema).min(0).required(),
  price: number().required(),
  with_fees_and_taxes: boolean().required(),
}).required();

export const HotelServiceDetailsValidationSchema =
  CommonServiceDataSchema.concat(
    object({
      pricePerNight: number().required(),
      serviceFee: number().required(),
      taxes: number().required(),
      rooms: array()
        .of(HotelServiceProviderRoomValidationSchema)
        .min(0)
        .required(),
      policies: HotelServiceProviderPolicicesValidationSchema,
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
