import { string, object, number } from "yup";
import { locationValidationSchema } from "validation";
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
