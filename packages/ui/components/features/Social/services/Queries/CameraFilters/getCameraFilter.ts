import { Exact, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { UseQueryOptions, useQuery } from "react-query";

export type GetCameraFilterQueryVariables = Exact<{
  id: string;
}>;

export type GetCameraFilterQuery = {
  __typename?: "Query";
  getCameraFilterById: {
    __typename?: "CameraFilter";
    createdAt: string;
    filterStylesJSON: string;
    id: string;
    name: string;
    thumbnail: string;
  };
};

export const getCameraFilterByIdQueryKey = (id: string) => [
  "get-camera-filter-by-id",
  { id },
];

export const getCameraFilterByIdQueryFetcher = async (id: string) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getCameraFilter($id: String!) {
  getCameraFilterById(id: $id) {
    createdAt
    filterStylesJSON
    id
    name
    thumbnail
  }
}

  `
    )
    .setVariables<GetCameraFilterQueryVariables>({ id })
    .send<GetCameraFilterQuery>();

  return res.data.getCameraFilterById;
};

export const useGetCameraFilterByIdQuery = (
  id: string,
  options?: UseQueryOptions<
    GetCameraFilterQuery["getCameraFilterById"],
    any,
    GetCameraFilterQuery["getCameraFilterById"],
    any
  >
) =>
  useQuery(
    getCameraFilterByIdQueryKey(id),
    () => getCameraFilterByIdQueryFetcher(id),
    options
  );
