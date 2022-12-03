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
  "restaurant",
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

const sentence =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley";

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
      attachements: [
        {
          src: "/shop-2.jpeg",
          type: "image",
        },
        {
          src: "/shop.jpeg",
          type: "image",
        },
      ],
      id: `${i}`,
      createdAt: new Date().toString(),
      label: shopLabels[randomNum(shopLabels.length)],
      name: "service name" + i,
      thumbnail: "/place-1.jpg",
      type: shopTypes[randomNum(shopTypes.length)],
      hashtags: ["fashion", "gaming", "shopping"],
      content: sentence.substring(0, randomNum(sentence.length)),
      user: {
        profession: "profession",
        accountType: "seller",
        id: "132",
        name: "seller name",
        public: true,
        thumbnail: "/shop-2.jpeg",
        verified: true,
        bio: "test",
        isFollowed: true,
        links: [],
        location: {
          address: "test",
          city: "test",
          cords: {
            lat: 54,
            lng: 132,
          },
          country: "test",
          countryCode: "chf",
          postalCode: 456,
          state: "test",
        },
        profileCoverPhoto: "test",
        publications: 54,
        subscribers: 45,
        subscriptions: 56,
        userId: "test",
      },
      postInteraction: {
        comments: randomNum(50),
        likes: randomNum(300),
      },
    })),
  };

  return res;
};
