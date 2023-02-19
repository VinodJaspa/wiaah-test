import {
  Affiliation,
  Exact,
  GetFilteredAffiliationsInput,
  Maybe,
  Product,
  Profile,
  Service,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetAdminFilteredAffiliationsQueryVariables = Exact<{
  args: GetFilteredAffiliationsInput;
}>;

export type GetAdminFilteredAffiliationsQuery = { __typename?: "Query" } & {
  getFilteredAffiliations: Array<
    { __typename?: "Affiliation" } & Pick<
      Affiliation,
      "id" | "sellerId" | "commision" | "createdAt" | "itemId" | "itemType"
    > & {
        product?: Maybe<
          { __typename?: "Product" } & Pick<Product, "price" | "thumbnail">
        >;
        service?: Maybe<
          { __typename?: "Service" } & Pick<Service, "price" | "thumbnail">
        >;
        seller: { __typename?: "Account" } & {
          profile?: Maybe<
            { __typename?: "Profile" } & Pick<Profile, "username">
          >;
        };
      }
  >;
};

type args = GetAdminFilteredAffiliationsQueryVariables["args"];
export const getAdminAffiliationsQueryKey = (args: args) => [
  "admin-affiliations",
  { args },
];

export const getAdminAffiliationsFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getAdminFilteredAffiliations($args:GetFilteredAffiliationsInput!){
  getFilteredAffiliations(
    filters:$args
  ){
    id
		product{
      price
      thumbnail
    }
    service{
      price
      thumbnail    	
    }
    sellerId
  	seller{
      profile{
        username
      }
    }
    commision
    createdAt
    itemId
    itemType
  }
}
    `);

  const res = await client
    .setVariables<GetAdminFilteredAffiliationsQueryVariables>({ args })
    .send<GetAdminFilteredAffiliationsQuery>();

  return res.data.getFilteredAffiliations;
};

export const useGetAdminAffiliationsQuery = (args: args) =>
  useQuery(getAdminAffiliationsQueryKey(args), () =>
    getAdminAffiliationsFetcher(args)
  );
