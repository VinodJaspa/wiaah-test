import { QueryPaginationInputs } from "api";
import { AsyncReturnType, DateRange } from "types";
import {
  InferType,
  HotelMetaDataValidationSchema,
  HotelsMetaDataApiResponseValidationSchema,
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
      name: "test",
      provider: "provider",
      thumbnail: "/place-2.jpg",
      location: {
        address: "test address",
        city: "city",
        cords: {
          lat: 40,
          lng: 45,
        },
        county: "country",
        postalCode: 13532,
      },
      type: "professional host",
      description: "random description",
      rate: 3.75,
      date: {
        from: Date.now(),
        to: Date.now(),
      },
      price: 45,
    })),
  };
  return data;
};
