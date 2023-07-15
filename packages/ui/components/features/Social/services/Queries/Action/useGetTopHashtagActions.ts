import { getRandomImage } from "@UI/placeholder";
import { createGraphqlRequestClient } from "api";
import { UseQueryOptions, useQuery } from "react-query";
import { Exact, Scalars } from "types";
import { isDev, randomNum } from "utils";

export type GetTopHashtagActionsQueryVariables = Exact<{
  tag: Scalars["String"];
}>;

export type GetTopHashtagActionsQuery = {
  __typename?: "Query";
  getTopHashtagActions: {
    __typename?: "ActionTopHashtagResponse";
    commented?: {
      __typename?: "Action";
      views: number;
      id: string;
      cover: string;
    } | null;
    liked?: {
      __typename?: "Action";
      views: number;
      id: string;
      cover: string;
    } | null;
    shared?: {
      __typename?: "Action";
      views: number;
      id: string;
      cover: string;
    } | null;
    viewed?: {
      __typename?: "Action";
      views: number;
      id: string;
      cover: string;
    } | null;
  };
};

type args = GetTopHashtagActionsQueryVariables;

export const getTopHashtagActionsQueryKey = (args: args) => [
  "get-top-hashtag-actions",
  { args },
];

export const getTopHashtagActionsQueryFetcher = async (args: args) => {
  if (isDev) {
    const res: GetTopHashtagActionsQuery["getTopHashtagActions"] = {
      liked: {
        views: randomNum(15000),
        id: "",
        cover: getRandomImage(),
      },
      commented: {
        views: randomNum(15000),
        id: "",
        cover: getRandomImage(),
      },
      shared: {
        views: randomNum(15000),
        id: "",
        cover: getRandomImage(),
      },
      viewed: {
        views: randomNum(15000),
        id: "",
        cover: getRandomImage(),
      },
    };

    return res;
  }

  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getTopHashtagActions($tag: String!) {
  getTopHashtagActions(tag: $tag) {
    commented {
      views
      id
      cover
    }
    liked {
      views
      id
      cover
    }
    shared {
      views
      id
      cover
    }
    viewed {
      views
      id
      cover
    }
  }
}

    `
    )
    .setVariables<GetTopHashtagActionsQueryVariables>(args)
    .send<GetTopHashtagActionsQuery>();

  return res.data.getTopHashtagActions;
};

export const useGetTopHashtagActionsQuery = (
  args: args,
  options?: UseQueryOptions<any, any, any, any>
) =>
  useQuery(
    getTopHashtagActionsQueryKey(args),
    () => getTopHashtagActionsQueryFetcher(args),
    options
  );
