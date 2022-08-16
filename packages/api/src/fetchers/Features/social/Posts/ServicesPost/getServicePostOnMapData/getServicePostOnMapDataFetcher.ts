import { FormatedSearchableFilter, QueryPaginationInputs } from "src/types";
import { AsyncReturnType } from "types";
import {
  CheckValidation,
  InferType,
  ServicePostOnMapValidationSchema,
  ServicePostsOnMapApiResponseValidationSchema,
} from "validation";

export type ServicePostOnMapType = InferType<
  typeof ServicePostOnMapValidationSchema
>;
export type ServicePostsOnMapApiResponseType = InferType<
  typeof ServicePostsOnMapApiResponseValidationSchema
>;

export const getServicePostsOnMapDataFetcher = async (
  filters: FormatedSearchableFilter,
  pagination: QueryPaginationInputs
): Promise<ServicePostsOnMapApiResponseType> => {
  const res: AsyncReturnType<typeof getServicePostsOnMapDataFetcher> = {
    hasMore: false,
    total: 150,
    data: [...Array(15)].map((_, i) => ({
      id: "123" + i,
      thumbnail: "/shop-2.jpeg",
      label: "service label",
      name: "service name",
      type: "seller",
      location: {
        address: "address",
        city: "city",
        cords: {
          lat: 45,
          lng: 32,
        },
        country: "country",
        countryCode: "CH",
        postalCode: 12345,
        state: "State",
      },
    })),
  };

  return CheckValidation(ServicePostsOnMapApiResponseValidationSchema, res);
};
