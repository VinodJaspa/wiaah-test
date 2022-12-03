import { object, string } from "yup";
import { locationValidationSchema, Phone } from "../../../SharedSchema";

export const ServiceReachOutDataValidationSchema = object({
  location: locationValidationSchema,
  email: string().email().required(),
  telephone: Phone().required(),
});
