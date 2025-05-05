import { QueryPaginationInputs, FormatedSearchableFilter } from "api";
import { AsyncReturnType, ServicesType } from "types";
import { randomNum } from "utils";
import {
  CheckValidation,
  InferType,
  RecommendedShopsApiResponseValidationSchema,
} from "validation";

export type RecommendedShopsAndServicesApiResponse = InferType<
  typeof RecommendedShopsApiResponseValidationSchema
>;

const shopTypes: ServicesType[] = [
  "hotel",
  "restaurant",
  "health_center",
  "vehicle",
  "holiday_rentals",
  "beauty_center",
];

const shopLabels = [
  "Hotel",
  "Restaurant",
  "Health Center",
  "Vehicle",
  "Holidays Rentals",
  "Beauty Center",
  "Ready to wear",
  "Video Game",
];

export const GetRecommendedShopsFetcher = async (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter
): Promise<RecommendedShopsAndServicesApiResponse> => {
  const res: AsyncReturnType<typeof GetRecommendedShopsFetcher> = {
    hasMore: false,
    total: 135,
    data: [...Array(pagination.take)].map((_, i) => ({
      id: `${i}`,
      name: "shop name",
      thumbnail: "/shop-2.jpeg",
      label: shopLabels[randomNum(shopLabels.length)],
      type: shopTypes[randomNum(shopTypes.length)],
    })),
  };

  return CheckValidation(RecommendedShopsApiResponseValidationSchema, res);
};
