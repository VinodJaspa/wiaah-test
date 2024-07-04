import { PaginationData } from "nest-utils";
import { AsyncReturnType } from "types";
import {
  PaginationFetchedData,
  QueryPaginationInputs,
} from "../../../../types";

const randomNum = (max: number) => Math.floor(Math.random() * max);
export type GetPostMentionsFetcherResponse = PaginationFetchedData<
  {
    thumbnail: string;
    userId: string;
    profielId: string;
    username: string;
    note: string;
    verified: boolean;
  }[]
>;

export const getPostMentionsFetcher = async (
  pagination: QueryPaginationInputs,
  props: { postId: string; postType: string }
): Promise<GetPostMentionsFetcherResponse> => {
  const res: AsyncReturnType<typeof getPostMentionsFetcher> = {
    hasMore: false,
    total: 156,
    data: [...Array(50)].map((_, i) => ({
      note: "gaming fan",
      profielId: "132",
      thumbnail: `/profile (${(i + 1) % 9 || 1}).jfif`,
      userId: "132",
      username: "username",
      verified: randomNum(10) > 7,
    })),
  };

  return res;
};
