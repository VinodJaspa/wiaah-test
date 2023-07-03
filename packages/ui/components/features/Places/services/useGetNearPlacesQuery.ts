import { Exact, GetNearShopsInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { UseQueryOptions, useQuery } from "react-query";

export type GetNearPlacesQueryVariables = Exact<{
  args: GetNearShopsInput;
}>;

export type GetNearPlacesQuery = {
  __typename?: "Query";
  getNearShops: Array<{
    id: string;
    thumbnail: string;
    name: string;
    email: string;
    rating: number;
    reviews: number;
    location: {
      address: string;
      city: string;
      country: string;
      state: string;
    };
  }>;
};

type args = GetNearPlacesQueryVariables["args"];
export const getNearPlacesQueryKey = (args: args) => [
  "get-near-places",
  { args },
];

export const getNearPlacesQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getNearPlaces(
    $args:GetNearShopsInput!
){
    getNearShops(
        GetNearShopsInput:$args
    ) {
        id
        thumbnail
        name
        email
        location{
            address
            city
            country
            address
            state
        }
        rating
        reviews
    } 
}
  `
    )
    .setVariables<GetNearPlacesQueryVariables>({ args })
    .send<GetNearPlacesQuery>();

  return res.data.getNearShops;
};

export const useGetNearPlacesQuery = (
  args: args,
  options?: UseQueryOptions<
    GetNearPlacesQuery["getNearShops"],
    unknown,
    GetNearPlacesQuery["getNearShops"],
    any
  >
) =>
  useQuery(
    getNearPlacesQueryKey(args),
    () => getNearPlacesQueryFetcher(args),
    options
  );
