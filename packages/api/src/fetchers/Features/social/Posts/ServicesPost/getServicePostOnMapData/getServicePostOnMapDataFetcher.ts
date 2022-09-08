import { FormatedSearchableFilter, QueryPaginationInputs } from "src/types";
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
        cords: {
          lat: 45,
          lng: 32,
        },
        country: "country",
        countryCode: "CH",
        postalCode: 12345,
        state: "State",
      },
      user: {
        accountType: "seller",
        id: "132",
        name: "seller name",
        profession: "profession",
        public: true,
        thumbnail: "/shop-2.jpeg",
        verified: true,
      },
    })),
  };

  return CheckValidation(ServicePostsOnMapApiResponseValidationSchema, res);
};
