import * as yup from "yup";
import { hasMoreValidationSchema } from "./units";

export const PaginationReturnDataValidationSchema = {
  hasMore: hasMoreValidationSchema,
  total: yup.number().required(),
};

export function CreatePaginationValidationSchemaOf<
  TSchema extends yup.AnySchema
>(schema: TSchema) {
  return yup
    .object({
      ...PaginationReturnDataValidationSchema,
      data: schema,
    })
    .required();
}

// improved, migrating...
export function CreatePaginationApiResponseValidationSchemaOf<
  TSchema extends yup.AnySchema
>(schema: TSchema) {
  return yup
    .object({
      ...PaginationReturnDataValidationSchema,
      data: yup.array().of<TSchema>(schema.required()).min(0).required(),
    })
    .required();
}
