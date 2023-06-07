import { createGraphqlRequestClient } from "api";
import { isDev } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import { Exact, FilteredShopsInput, Shop, StoreType } from "@features/API";
import { useQuery } from "react-query";

export type GetShopsQueryVariables = Exact<{
  input: FilteredShopsInput;
}>;

export type GetShopsQuery = { __typename?: "Query" } & {
  getFilteredShops: Array<
    { __typename?: "Shop" } & Pick<
      Shop,
      "id" | "banner" | "name" | "ownerId" | "verified" | "storeType"
    >
  >;
};

export const useGetFilteredShopsQuery = (input: FilteredShopsInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
  query getShops(
    $input:FilteredShopsInput!
    ){
        getFilteredShops(
            filteredShopsArgs:$input
        ){
            id
            banner
            name
            ownerId
            verified
            storeType
        }
    }
`);

  client.setVariables(input);

  return useQuery("filtered-products", async () => {
    if (isDev) {
      const mockres: GetShopsQuery["getFilteredShops"] = [...Array(15)].map(
        () => ({
          banner: getRandomImage(),
          id: "",
          name: "Service name",
          ownerId: "",
          storeType: StoreType.Product,
          verified: true,
        })
      );
      return mockres;
    }

    const res = await client.send<GetShopsQuery>();

    return res.data.getFilteredShops;
  });
};
