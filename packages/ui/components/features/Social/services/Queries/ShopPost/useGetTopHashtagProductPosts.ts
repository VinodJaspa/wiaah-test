import { createGraphqlRequestClient } from "@UI/../api";
import { Exact, Scalars } from "@features/API";
import {
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from "react-query";

export type GetTopHashtagProductPostsQueryVariables = Exact<{
  tag: Scalars["String"]["input"];
}>;

export type GetTopHashtagProductPostsQuery = {
  __typename?: "Query";
  getTopHashtagProductPosts: {
    __typename?: "HashtagProductPost";
    commented?: {
      __typename?: "ProductPost";
      views: number;
      id: string;
      product: { __typename?: "Product"; id: string; thumbnail: string };
    } | null;
    liked?: {
      __typename?: "ProductPost";
      views: number;
      id: string;
      product: { __typename?: "Product"; id: string; thumbnail: string };
    } | null;
    shared?: {
      __typename?: "ProductPost";
      views: number;
      id: string;
      product: { __typename?: "Product"; id: string; thumbnail: string };
    } | null;
    viewed?: {
      __typename?: "ProductPost";
      views: number;
      id: string;
      product: { __typename?: "Product"; id: string; thumbnail: string };
    } | null;
  };
};

type args = GetTopHashtagProductPostsQueryVariables;

export const getTopHashtagProductPostsQueryKey = (args: args) => [
  "get-top-hashtag-product-posts",
  { args },
];

export const getTopHashtagProductPostsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getTopHashtagProductPosts($tag: String!) {
  getTopHashtagProductPosts(tag: $tag) {
    commented {
      views
      id
      product {
        id
        thumbnail
      }
    }
    liked {
      views
      id
      product {
        id
        thumbnail
      }
    }
    shared {
      views
      id
      product {
        id
        thumbnail
      }
    }
    viewed {
      views
      id
      product {
        id
        thumbnail
      }
    }
  }
}
    `
    )
    .setVariables<GetTopHashtagProductPostsQueryVariables>(args)
    .send<GetTopHashtagProductPostsQuery>();

  return res.data.getTopHashtagProductPosts;
};

export const useGetTopHashtagProductPosts = (
  args: args,
  options?: UseInfiniteQueryOptions<
    GetTopHashtagProductPostsQuery["getTopHashtagProductPosts"],
    unknown,
    GetTopHashtagProductPostsQuery["getTopHashtagProductPosts"],
    GetTopHashtagProductPostsQueryVariables,
    any
  >
) =>
  useInfiniteQuery(
    getTopHashtagProductPostsQueryKey(args),
    () => getTopHashtagProductPostsQueryFetcher(args),
  );
