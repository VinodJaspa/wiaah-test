import {
  FormatedSearchableFilter,
  QueryPaginationInputs,
} from "../../../../../../types/index";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  CheckValidation,
  InferType,
  ServicePostMetaDataValidationSchema,
  ServicePostsMetaDataApiResponseValidationSchema,
} from "validation";

export type ServicePostMetaDataType = InferType<
  typeof ServicePostMetaDataValidationSchema
>;

export type getServicePostsMetaDataApiResponse = InferType<
  typeof ServicePostsMetaDataApiResponseValidationSchema
>;

export const getServicePostsMetaDataFetcher = (
  filters: FormatedSearchableFilter,
  pagination: QueryPaginationInputs
): Promise<getServicePostsMetaDataApiResponse> => {
  const res: AsyncReturnType<typeof getServicePostsMetaDataFetcher> = {
    hasMore: false,
    total: randomNum(163),
    data: [...Array(15)].map((_, i) => ({
      attachments: [
        {
          src: "https://example.com/placeholder.jpg",
          type: "image",
        },
      ],
      likes: 0,
      replies: 0,
      price: 15,
      rate: 4,
      location: {
        address: "address",
        country: "France",
        lon: 44,
        lat: 54,
        postalCode: 4325,
        countryCode: "US",
        city: "city",
        state: "state",
      },
      user: {
        id: "user1",
        userId: "user1",
        verified: true,
        name: "John Doe",
        thumbnail: "https://example.com/thumbnail.jpg",
        accountType: "seller",
        public: true,
        profession: "Software Developer",
        publications: 10,
        subscriptions: 5,
        subscribers: 1000,
        location: {
          address: "123 Main St",
          city: "Sample City",
          state: "Sample State",
          country: "Sample Country",
          lat: 12.345678,
          lon: 98.765432,
          postalCode: 43243,
          countryCode: "US",
        },
        bio: "This is a a bit long bio smaple to check the design .",
        links: ["https://example.com"],
        isFollowed: false,
        profileCoverPhoto: "https://example.com/profile-cover.jpg",
      },
      reviews: 150,
      id: "123" + i,
      label: "service label",
      name: "service name",
      type: "seller",
    })),
  };

  return CheckValidation(ServicePostsMetaDataApiResponseValidationSchema, res);
};
