import * as yup from "yup";
import { Assign, ObjectShape } from "yup/lib/object";
import { hasMoreValidationSchema } from "./units";

export const PaginationReturnDataValidationSchema = {
  hasMore: hasMoreValidationSchema,
};

export function CreatePaginationValidationSchemaOf<TSchema>(
  schema: yup.ObjectSchema<ObjectShape, TSchema>
) {
  return yup.object({
    ...PaginationReturnDataValidationSchema,
    data: schema,
  });
}
