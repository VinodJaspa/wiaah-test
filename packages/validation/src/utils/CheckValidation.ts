import { AnySchema } from "yup";

export async function CheckValidation<TData = any>(
  schema: AnySchema,
  data: TData,
  ThrowableError: any = Error
) {
  await schema.validate(data);
}
