import { string, object, number } from "yup";
import { locationValidationSchema } from "../../../../";
export const HealthCenterPractitionerSearchDataValidationSchema = object({
  name: string().required(),
  photo: string().required(),
  specialty: string().required(),
  location: locationValidationSchema,
});

export const HealthCenterPractitionerDataValidationSchema = object({
  name: string().required(),
  photo: string().required(),
  specialty: string().required(),
  rate: number().required(),
  location: locationValidationSchema,
});
