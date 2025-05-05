import { createGraphqlRequestClient } from "api";
import {

  Exact,
  GetPostsByHashtagInput,
  NewsfeedPost,
  NewsfeedPostsPaginationResponse,
} from "@features/API";
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useQuery,
} from "react-query";


export type GetTrendingPostsByHashtagQueryVariables = Exact<{
  args: GetPostsByHashtagInput;
}>;

export type GetTrendingPostsByHashtagQuery = { __typename?: "Query" } & {
  getTrendingHashtagPosts: {
    __typename?: "NewsfeedPostsPaginationResponse";
  } & Pick<
    NewsfeedPostsPaginationResponse,
    "hasMore" | "nextCursor" | "cursor"
  > & {
      data: Array<
        { __typename?: "NewsfeedPost" } & Pick<
          NewsfeedPost,
          "id" | "thumbnail" | "views"
        >
      >;
    };
};

type args = GetTrendingPostsByHashtagQueryVariables["args"];

export const getSimillarHashtagPostsQueryKey = (args: args) => [
  "get-simillar-hashtag-posts",
  { args },
];

export const getSimillarHashtagPostsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();
  const res = await client
    .setQuery(
      `
query getTrendingPostsByHashtag($args:GetPostsByHashtagInput!){
  getTrendingHashtagPosts(args:$args){
    total
    hasMore
    data{
      id
      thumbnail
      views
    }
  }
}
  `
    )
    .setVariables<GetTrendingPostsByHashtagQueryVariables>({ args })
    .send<GetTrendingPostsByHashtagQuery>();

  return res.data.getTrendingHashtagPosts;
};

export const useGetTrendingHashtagPosts = (
  args: args,
  options?: UseInfiniteQueryOptions<
    GetTrendingPostsByHashtagQuery["getTrendingHashtagPosts"],
    unknown,
    GetTrendingPostsByHashtagQuery["getTrendingHashtagPosts"],
    any,
    any
  >
) =>
  useInfiniteQuery(
    getSimillarHashtagPostsQueryKey(args),
    ({ pageParam }) =>
      getSimillarHashtagPostsQueryFetcher({
        ...args,
        cursor: pageParam || args.cursor,
      }),
    options
  );
