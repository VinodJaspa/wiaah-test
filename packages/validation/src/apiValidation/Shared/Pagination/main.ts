import * as yup from "yup";
import { hasMoreValidationSchema } from "./units";

export const PaginationReturnDataValidationSchema = {
  hasMore: hasMoreValidationSchema,
};

export function CreatePaginationValidationSchemaOf<
  TSchema extends yup.AnyObjectSchema
>(schema: TSchema, isArray: boolean) {
  return yup
    .object()
    .required()
    .shape({
      ...PaginationReturnDataValidationSchema,
      data: isArray ? yup.array().of(schema) : schema,
    });
}
