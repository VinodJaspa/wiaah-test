import * as yup from "yup";

export function createApiResponseValidationSchema<
  TSchema extends yup.AnySchema
>(schema: TSchema) {
  return yup.object({
    data: schema,
  });
}
