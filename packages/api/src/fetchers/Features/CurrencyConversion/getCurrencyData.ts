import { AsyncReturnType } from "types";
import {
  InferType,
  CurrencyConversionApiResponseValidationSchema,
  CheckValidation,
  CurrencyConversionValidationSchema,
} from "validation";

export type CurrencyDataType = InferType<
  typeof CurrencyConversionValidationSchema
>;

const currenciesData: CurrencyDataType[] = [
  {
    code: "EUR",
    ratio: 0.99391,
    symbol: "€",
  },
  {
    code: "GBP",
    ratio: 0.84302,
    symbol: "£",
  },
  {
    code: "CHF",
    ratio: 0.95806,
    symbol: "₣",
  },
  {
    code: "USD",
    ratio: 1,
    symbol: "$",
  },
];

export const getCurrencyDataFetcher = async (
  currencyCode: string
): Promise<InferType<typeof CurrencyConversionApiResponseValidationSchema>> => {
  const res: AsyncReturnType<typeof getCurrencyDataFetcher> = {
    data: currenciesData.find(
      (curr) => curr.code.toLowerCase() === currencyCode.toLowerCase()
    ) as CurrencyDataType,
  };
  return CheckValidation(CurrencyConversionApiResponseValidationSchema, res);
};
