import { EffectStatus, Exact, GetTopEffectsInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { UseQueryOptions, useQuery } from "react-query";

export type GetCameraEffectsQueryVariables = Exact<{
  args: GetTopEffectsInput;
}>;

export type GetCameraEffectsQuery = {
  __typename?: "Query";
  getTopEffects: {
    __typename?: "EffectCursorPaginationResponse";
    cursor?: string | null;
    hasMore: boolean;
    nextCursor?: string | null;
    total: number;
    data: Array<{
      __typename?: "Effect";
      id: string;
      name: string;
      status: EffectStatus;
      thumbnail: string;
      usage: number;
    }>;
  };
};

type args = GetCameraEffectsQueryVariables["args"];

export const getCameraEffectsQuerykey = (args: args) => [
  "get-camera-effects",
  { args },
];

export const getCameraEffectsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getCameraEffects($args: GetTopEffectsInput!) {
  getTopEffects(args: $args) {
    cursor
    data {
      id
      name
      status
      thumbnail
      usage
    }
    hasMore
    nextCursor
    total
  }
}
  `
    )
    .setVariables<GetCameraEffectsQueryVariables>({ args })
    .send<GetCameraEffectsQuery>();

  return res.data.getTopEffects;
};

export const useGetCameraEffectsQuery = (
  args: args,
  options?: UseQueryOptions<
    GetCameraEffectsQuery["getTopEffects"],
    any,
    GetCameraEffectsQuery["getTopEffects"],
    any
  >
) =>
  useQuery(
    getCameraEffectsQuerykey(args),
    () => getCameraEffectsQueryFetcher(args),
    options
  );
