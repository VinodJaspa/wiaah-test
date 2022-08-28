import { createApiResponseValidationSchema } from "../../../SharedSchema";
import { array, object, string } from "yup";

export const HotelAmenitesValidationSchema = object({
  amenites: array().of(string().required()).min(0).required(),
});

export const HotelAmenitesApiResponseValidationSchema =
  createApiResponseValidationSchema(HotelAmenitesValidationSchema);
