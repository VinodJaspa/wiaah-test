import { QueryPaginationInputs } from "api";
import { AsyncReturnType, DateRange } from "types";
import { randomNum } from "utils";
import {
  InferType,
  HotelMetaDataValidationSchema,
  HotelsMetaDataApiResponseValidationSchema,
  CheckValidation,
} from "validation";

export type HotelsMetaData = InferType<typeof HotelMetaDataValidationSchema>;

export type HotelsMetaDataApiResponseType = InferType<
  typeof HotelsMetaDataApiResponseValidationSchema
>;

export const getHotelsMetaDataFetcher = async (
  pagination: QueryPaginationInputs,
  location: string
): Promise<HotelsMetaDataApiResponseType> => {
  const data: AsyncReturnType<typeof getHotelsMetaDataFetcher> = {
    hasMore: false,
    data: [...Array(pagination.take || 10)].map(() => ({
      id: "123",
      name: "Luxury Paris Hotel",
      provider: "provider",
      thumbnail: "/place-2.jpg",
      location: {
        address: "test address",
        city: "paris",
        lat: 40,
        lon: 45,
        postalCode: 13532,
        country: "france",
        countryCode: "USA",
        state: "state",
      },
      type: "professional host",
      description: "random description",
      rate: 3.75,
      date: {
        from: new Date(Date.now()).toString(),
        to: new Date(Date.now()).toString(),
      },
      price: 45,
    })),
    total: randomNum(165),
  };
  return CheckValidation(HotelsMetaDataApiResponseValidationSchema, data);
};
