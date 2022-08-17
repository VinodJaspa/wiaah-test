import { FormatedSearchableFilter, QueryPaginationInputs } from "src/types";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  PostCommentValidationSchema,
  PostCommentsApiResponseValidationSchema,
  InferType,
  CheckValidation,
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
      attachment:
        randomNum(10) > 7 ? { src: "/shop-3.jpeg", type: "image" } : undefined,
      content: "nice post " + i,
      createdAt: new Date().toString(),
      hashTags: ["fashion", "shopping"],
      likes: randomNum(35),
      replies: randomNum(135),
      user: {
        id: "" + i,
        accountType: "seller",
        name: "seller name",
        public: true,
        verified: true,
        thumbnail: "/shop-2.jpeg",
      },
    })),
  };

  return res;
};
