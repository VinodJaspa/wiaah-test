import {
  locationValidationSchema,
  Phone,
  dayWorkingPeriodValidationSchema,
  createApiResponseValidationSchema,
} from "../../SharedSchema";
import { object, string, number, array, mixed, boolean } from "yup";

export type PresntationMediaType = "video" | "image";
const PresntationMediaTypes: PresntationMediaType[] = ["video", "image"];

export const PopularAmenitiesValidationSchema = object({
  name: string().required(),
  slug: string().required(),
}).required();

export const PresntationMediaValidationSchema = object({
  src: string().required(),
  type: mixed<PresntationMediaType>().oneOf(PresntationMediaTypes).required(),
  thumbnail: string().required(),
});

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

export const ServicesProviderDataValidationSchema = object({
  id: string().required(),
  thumbnail: string().required(),
  name: string().required(),
  rating: number().min(0).max(5).required(),
  description: string().required(),
  reviewsCount: number().min(0).required(),
  heroImages: array().of(PresntationMediaValidationSchema).required(),
  location: locationValidationSchema,
  email: string().email().required(),
  telephone: Phone().required(),
  proprtyType: string().required(),
  pricePerNight: number().required(),
  serviceFee: number().required(),
  taxes: number().required(),
  rooms: array().of(HotelServiceProviderRoomValidationSchema).min(0).required(),
  policies: HotelServiceProviderPolicicesValidationSchema,
  travelPeriod: object({
    arrival: string().required(),
    departure: string().required(),
  }).required(),
  PopularAmenities: array()
    .of(PopularAmenitiesValidationSchema)
    .min(0)
    .required(),
  workingDays: array()
    .of(dayWorkingPeriodValidationSchema)
    .length(7)
    .required(),
}).required();

export const ServicesProviderApiResponseValidationSchema =
  createApiResponseValidationSchema(
    ServicesProviderDataValidationSchema
  ).required();
