import { FormatedSearchableFilter, QueryPaginationInputs } from "src";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  CheckValidation,
  ShopDetialsApiResponseValidationSchema,
  ShopDetialsValidationSchema,
} from "validation";
import { InferType } from "yup";

export type ShopDetailsData = InferType<typeof ShopDetialsValidationSchema>;

export type ShopDetailsApiResponse = InferType<
  typeof ShopDetialsApiResponseValidationSchema
>;

export const getShopDetailsFetcher = async (
  filters: FormatedSearchableFilter
): Promise<ShopDetailsApiResponse> => {
  const res: AsyncReturnType<typeof getShopDetailsFetcher> = {
    data: {
      id: "131",
      createdAt: new Date().toUTCString(),
      description: "description",
      location: {
        address: "address",
        city: "city",
        cords: {
          lat: 46,
          lng: 45,
        },
        country: "Switzerland",
        countryCode: "CH",
        postalCode: 1324,
        state: "Geneve",
      },
      name: "shop name",
      rating: randomNum(5),
      thumbnail: "/shop.jpeg",
      verified: true,
    },
  };
  return CheckValidation(ShopDetialsApiResponseValidationSchema, res);
};
