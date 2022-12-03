import * as yup from "yup";
import {
  locationValidationSchema,
  CreatePaginationApiResponseValidationSchemaOf,
} from "../../SharedSchema";

export const generalServicesDataValidationSchema = yup.object({
  id: yup.string().required(),
  description: yup.string().required(),
  name: yup.string().required(),
  location: locationValidationSchema,
  isNew: yup.boolean().required(),
  thumbnail: yup.string().required(),
  services: yup.array(yup.string().required()).min(0).required(),
});

export const generalServicesApiValidationSchema =
  CreatePaginationApiResponseValidationSchemaOf(
    generalServicesDataValidationSchema
  );
