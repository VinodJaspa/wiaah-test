import { EffectStatus, Exact } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { UseQueryOptions, useQuery } from "react-query";

export type GetCameraEffectByIdQueryVariables = Exact<{
  id: string;
}>;

export type GetCameraEffectByIdQuery = {
  __typename?: "Query";
  getEffect?: {
    __typename?: "Effect";
    id: string;
    name: string;
    status: EffectStatus;
    thumbnail: string;
    usage: number;
  } | null;
};

export const getCameraEffectByIdQueryKey = (id: string) => [
  "camera-effect-by-id",
  { id },
];

export const getCameraEffectByIdQueryFetcher = async (id: string) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
  query getCameraEffectById($id: String!) {
  getEffect(id: $id) {
    id
    name
    status
    thumbnail
    usage
  }
}
  `
    )
    .setVariables<GetCameraEffectByIdQueryVariables>({ id })
    .send<GetCameraEffectByIdQuery>();

  return res.data.getEffect;
};

export const useGetCaneraEffectById = (
  id: string,
  options?: UseQueryOptions<
    GetCameraEffectByIdQuery["getEffect"],
    any,
    GetCameraEffectByIdQuery["getEffect"],
    any
  >
) =>
  useQuery(
    getCameraEffectByIdQueryKey(id),
    () => getCameraEffectByIdQueryFetcher(id),
    options
  );
