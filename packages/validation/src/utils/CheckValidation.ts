import { AnySchema } from "yup";

export async function CheckValidation<TData = any>(
  schema: AnySchema,
  data: TData,
  ThrowableError: any = Error
): Promise<TData> {
  try {
    const res = await schema.validate(data);
    return res;
  } catch (error) {
    console.error(error);
    throw new ThrowableError("recieved invalid data ");
  }
}
