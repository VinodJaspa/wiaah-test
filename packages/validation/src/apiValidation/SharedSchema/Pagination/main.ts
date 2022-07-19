import * as yup from "yup";
import { hasMoreValidationSchema } from "./units";

export const PaginationReturnDataValidationSchema = {
  hasMore: hasMoreValidationSchema,
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
