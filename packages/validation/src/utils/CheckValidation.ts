import { AnySchema } from "yup";

export async function CheckValidation<TData = any>(
  schema: AnySchema,
  data: TData,
  ThrowableError: any = Error
) {
  const isValid = await schema.isValid(data);
  if (!isValid) throw new ThrowableError();
}
