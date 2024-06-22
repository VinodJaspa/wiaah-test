import {
  FormatedSearchableFilter,
  QueryPaginationInputs,
} from "../../../../../../types/index";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
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
const serviceslabels = [
  "Hotel",
  "Holiday Rentals",
  "Restaurant",
  "Health Center",
  "Beauty Center",
  "Vehicle",
];

export const getServicePostsOnMapDataFetcher = async (
  filters: FormatedSearchableFilter,
  pagination: QueryPaginationInputs
): Promise<ServicePostsOnMapApiResponseType> => {
  const res: AsyncReturnType<typeof getServicePostsOnMapDataFetcher> = {
    hasMore: false,
    total: 150,
    data: [...Array(16)].map((_, i) => ({
      price: 16,
      rate: 4,
      reviews: 150,
      attachments: [
        { src: `/place-${randomNum(4) || 1}.jpg`, type: "image" },
        { src: "/video.mp4", type: "video" },
      ],
      id: "123" + i,
      thumbnail: "/shop-2.jpeg",
      label: serviceslabels[randomNum(serviceslabels.length)],
      name: "service name",
      type: "seller",
      location: {
        address: "address",
        city: "city",
        lat: 45,
        lon: 32,
        country: "country",
        countryCode: "CH",
        postalCode: 12345,
        state: "State",
      },

      user: {
        id: "user1",
        userId: "user1",
        verified: true,
        name: "Placeholder Name",
        thumbnail: "https://example.com/thumbnail.jpg",
        accountType: "seller",
        public: true,
        profession: "Placeholder Profession",
        publications: 0,
        subscriptions: 0,
        subscribers: 0,
        location: {
          address: "123 Placeholder St",
          city: "Placeholder City",
          state: "Placeholder State",
          country: "Placeholder Country",
          lat: 0.0,
          lon: 0.0,
          postalCode: 443243,
          countryCode: "US",
        },
        bio: "This is a placeholder bio.",
        links: ["https://example.com"],
        isFollowed: false,
        profileCoverPhoto: "https://example.com/profile-cover-photo.jpg",
      },
    })),
  };

  return res;
};
