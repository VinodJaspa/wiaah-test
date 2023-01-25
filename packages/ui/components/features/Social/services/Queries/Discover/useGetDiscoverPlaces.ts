import { Exact } from "types";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  GetPlaceSuggestionInput,
  Place,
} from "@features/Social/services/types";

export type GetDiscoverPlacesQueryVariables = Exact<{
  args: GetPlaceSuggestionInput;
}>;

export type GetDiscoverPlacesQuery = { __typename?: "Query" } & {
  getPlaceSuggestions: { __typename?: "PlaceSuggestions" } & {
    places: Array<{ __typename?: "Place" } & Pick<Place, "id" | "type">>;
  };
};

export const useGetDiscoverPlaces = (args: GetPlaceSuggestionInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getDiscoverPlaces(
            $args:GetPlaceSuggestionInput!
        ){
            getPlaceSuggestions(
                args:$args
            ){
                places{
                    id
                    type
                }
            }
        }
    `);

  client.setVariables<GetDiscoverPlacesQueryVariables>({
    args,
  });

  return useQuery(["getDiscoverPlaces"], async () => {
    const res = await client.send<GetDiscoverPlacesQuery>();

    return res.data.getPlaceSuggestions;
  });
};
