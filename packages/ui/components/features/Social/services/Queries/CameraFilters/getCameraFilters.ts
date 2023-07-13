import {
  CameraFilterStatus,
  Exact,
  GetCameraFiltersInput,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useQuery,
} from "react-query";

export type GetCameraFiltersQueryVariables = Exact<{
  args: GetCameraFiltersInput;
}>;

export type GetCameraFiltersQuery = {
  __typename?: "Query";
  getCameraFilters: {
    __typename?: "CameraFiltersCursorResponse";
    cursor?: string | null;
    hasMore: boolean;
    nextCursor?: string | null;
    total: number;
    data: Array<{
      __typename?: "CameraFilter";
      createdAt: string;
      filterStylesJSON: string;
      id: string;
      name: string;
      status: CameraFilterStatus;
      thumbnail: string;
      updatedAt: string;
      usage: number;
    }>;
  };
};

type args = GetCameraFiltersQueryVariables["args"];

export const getCameraFiltersQueryKey = (args: args) => [
  "get-camera-filters",
  { args },
];

export const getCameraFiltersQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getCameraFilters(
    $args:GetCameraFiltersInput!
){
  getCameraFilters(
      args:$args
  ){
      cursor
      data {
          createdAt
          filterStylesJSON
          id
          name
          status
          thumbnail
          updatedAt
          usage
      }
      hasMore
      nextCursor
      total
  }
}
  `
    )
    .setVariables<GetCameraFiltersQueryVariables>({ args })
    .send<GetCameraFiltersQuery>();

  return res.data.getCameraFilters;
};

export const useGetCameraFiltersQuery = (
  args: args,
  options?: UseInfiniteQueryOptions<
    GetCameraFiltersQuery["getCameraFilters"],
    any,
    GetCameraFiltersQuery["getCameraFilters"],
    any,
    any
  >
) =>
  useInfiniteQuery(
    getCameraFiltersQueryKey(args),
    ({ pageParam }) =>
      getCameraFiltersQueryFetcher({
        ...args,
        cursor: pageParam || args.cursor,
      }),
    options
  );
