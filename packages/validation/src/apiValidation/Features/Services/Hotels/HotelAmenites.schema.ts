import { createApiResponseValidationSchema } from "../../../SharedSchema";
import { array, object, string } from "yup";

export const ServiceAmenite = object({
  name: string().required(),
  slug: string().required(),
});

export const HotelAmenitesValidationSchema = object({
  amenites: array().of(ServiceAmenite.required()).min(0).required(),
});

export const HotelAmenitesApiResponseValidationSchema =
  createApiResponseValidationSchema(HotelAmenitesValidationSchema);
