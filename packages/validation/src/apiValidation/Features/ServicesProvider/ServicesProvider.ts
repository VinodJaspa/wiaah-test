import {
  locationValidationSchema,
  Phone,
  dayWorkingPeriodValidationSchema,
  createApiResponseValidationSchema,
} from "../../SharedSchema";
import { object, string, number, array, mixed } from "yup";

export type PresntationMediaType = "video" | "image";
const PresntationMediaTypes: PresntationMediaType[] = ["video", "image"];

export const PresntationMediaValidationSchema = object({
  src: string().required(),
  type: mixed<PresntationMediaType>().oneOf(PresntationMediaTypes).required(),
  thumbnail: string().required(),
});

export const ServicesProviderDataValidationSchema = object({
  thumbnail: string().required(),
  name: string().required(),
  rating: number().min(0).max(5).required(),
  description: string().required(),
  reviewsCount: number().min(0).required(),
  heroImages: array().of(PresntationMediaValidationSchema).required(),
  location: locationValidationSchema,
  telephone: Phone().required(),
  proprtyType: string().required(),
  pricePerNight: number().required(),
  serviceFee: number().required(),
  taxes: number().required(),
  workingDays: array()
    .of(dayWorkingPeriodValidationSchema)
    .length(7)
    .required(),
}).required();

export const ServicesProviderApiResponseValidationSchema =
  createApiResponseValidationSchema(
    ServicesProviderDataValidationSchema
  ).required();
