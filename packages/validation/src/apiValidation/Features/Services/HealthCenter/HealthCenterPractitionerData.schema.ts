import { locationValidationSchema } from "../../../SharedSchema/Location";
import { string, object, number } from "yup";

export const HealthCenterPractitionerSearchDataValidationSchema = object({
  name: string().required(),
  photo: string().required(),
  specialty: string().required(),
  location: locationValidationSchema,
});

export const HealthCenterPractitionerDataValidationSchema = object({
  id: string().required(),
  name: string().required(),
  photo: string().required(),
  specialty: string().required(),
  rate: number().required(),
  reviews: number().required(),
  location: locationValidationSchema,
});
