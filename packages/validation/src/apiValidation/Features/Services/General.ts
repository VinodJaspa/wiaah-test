import * as yup from "yup";
import {
  PaginationReturnDataValidationSchema,
  locationValidationSchema,
} from "validation";

export const generalServicesDataValidationSchema = yup.object().shape({
  description: yup.string().required(),
  name: yup.string().required(),
  location: locationValidationSchema,
  isNew: yup.boolean().required(),
  thumbnail: yup.string().required(),
  services: yup.array(yup.string()),
});

export const generalServicesApiValidationSchema = yup.object().shape({
  ...PaginationReturnDataValidationSchema,
  data: yup.array(generalServicesDataValidationSchema),
});
