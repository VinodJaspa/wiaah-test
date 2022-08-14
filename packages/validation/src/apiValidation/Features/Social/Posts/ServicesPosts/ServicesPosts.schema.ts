import {
  createApiResponseValidationSchema,
  CreatePaginationApiResponseValidationSchemaOf,
} from "../../../../SharedSchema";
import { object, string } from "yup";

export const ServicesPostsValidationSchema = object({
  id: string().required(),
  name: string().required(),
  thumbnail: string().required(),
  label: string().required(),
  type: string().required(),
});

export const ServicesPostsApiResponseValidationSchema =
  CreatePaginationApiResponseValidationSchemaOf(ServicesPostsValidationSchema);
