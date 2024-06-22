import {
  FormatedSearchableFilter,
  QueryPaginationInputs,
} from "../../../types/index";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  CheckValidation,
  InferType,
  ShopMapSearchDataValidationSchema,
  ShopsMapSearchDataApiResponseValidationSchema,
} from "validation";

export type ShopMapSearchDataType = InferType<
  typeof ShopMapSearchDataValidationSchema
>;

export type ShopsMapSearchDataApiResponse = InferType<
  typeof ShopsMapSearchDataApiResponseValidationSchema
>;

export const getShopsMapSearchDataFetcher = async (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter
): Promise<ShopsMapSearchDataApiResponse> => {
  const res: AsyncReturnType<typeof getShopsMapSearchDataFetcher> = {
    data: [...Array(pagination.take)].map(() => ({
      id: "123",
      name: "shop name",
      rate: randomNum(5),
      categories: [{ icon: "/", name: "electronics" }],
      thumbnail: "/shop-2.jpeg",
      location: {
        address: "address",
        city: "paris",
        lat: 15,
        lon: 21,
        country: "France",
        countryCode: "CHF",
        postalCode: 135465,
        state: "Geneve",
      },
    })),
    hasMore: true,
    total: randomNum(300),
  };

  return CheckValidation(ShopsMapSearchDataApiResponseValidationSchema, res);
};
