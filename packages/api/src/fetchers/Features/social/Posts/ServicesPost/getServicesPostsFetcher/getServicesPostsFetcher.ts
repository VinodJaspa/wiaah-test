import { QueryPaginationInputs } from "src/types";
import { AsyncReturnType, ServicesType } from "types";
import { randomNum } from "utils";
import {
  CheckValidation,
  ServicesPostsValidationSchema,
  ServicesPostsApiResponseValidationSchema,
  InferType,
} from "validation";

export type ServicePostType = InferType<typeof ServicesPostsValidationSchema>;

const shopTypes: ServicesType[] = [
  "hotel",
  "resturant",
  "health_center",
  "vehicle",
  "holidays_rentals",
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

export type getServicesPostsResponse = InferType<
  typeof ServicesPostsApiResponseValidationSchema
>;

export const getServicesPostsFetcher = async (
  pagination: QueryPaginationInputs
): Promise<getServicesPostsResponse> => {
  const res: AsyncReturnType<typeof getServicesPostsFetcher> = {
    hasMore: false,
    total: 156,
    data: [...Array(pagination.take)].map((_, i) => ({
      id: `${i}`,
      label: shopLabels[randomNum(shopLabels.length)],
      name: "service name" + i,
      thumbnail: "/place-1.jpg",
      type: shopTypes[randomNum(shopTypes.length)],
      hashtags: ["fashion", "gaming", "shopping"],
      user: {
        accountType: "seller",
        id: "132",
        name: "seller name",
        public: true,
        thumbnail: "/shop-2.jpeg",
        verified: true,
      },
      postInteraction: {
        comments: randomNum(50),
        likes: randomNum(300),
      },
    })),
  };

  return CheckValidation(ServicesPostsApiResponseValidationSchema, res);
};
