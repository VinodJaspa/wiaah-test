import { string, object } from "yup";
import { locationValidationSchema } from "src";
export const HealthCenterPractitionerSearchDataValidationSchema =
  object().shape({
    name: string().required(),
    photo: string().required(),
    specialty: string().required(),
    location: locationValidationSchema,
  });

export const HealthCenterPractitionerData = object().shape({
  name: string().required(),
  photo: string().required(),
  specialty: string().required(),
  location: locationValidationSchema,
});
