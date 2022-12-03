import { createApiResponseValidationSchema } from "../../SharedSchema";
import { number, object, string } from "yup";

export const CurrencyConversionValidationSchema = object({
  code: string().required(),
  ratio: number().required(),
  symbol: string().required(),
});

export const CurrencyConversionApiResponseValidationSchema =
  createApiResponseValidationSchema(CurrencyConversionValidationSchema);
