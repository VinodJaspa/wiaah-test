import {
  FormatedSearchableFilter,
  QueryPaginationInputs,
} from "../../../../../types/index";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  PostCommentValidationSchema,
  PostCommentsApiResponseValidationSchema,
  InferType,
  CheckValidation,
  PostAttachmentType,
} from "validation";

export type PostCommentType = InferType<typeof PostCommentValidationSchema>;
export type PostCommentsApiResponse = InferType<
  typeof PostCommentsApiResponseValidationSchema
>;

export const getPostCommentsFetcher = async (
  filters: FormatedSearchableFilter,
  pagination: QueryPaginationInputs
): Promise<PostCommentsApiResponse> => {
  const res: AsyncReturnType<typeof getPostCommentsFetcher> = {
    hasMore: true,
    total: randomNum(15),
    data: [...Array(5)].map((_, i) => ({
      id: `${i}`,
      content: "This is a placeholder post content.",
      createdAt: new Date().toISOString(),
      hashTags: ["#placeholder", "#example"],
      attachment: {
        src: "https://example.com/placeholder.jpg",
        type: "image" as PostAttachmentType,
      },

      likes: 0,
      replies: 0,
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
