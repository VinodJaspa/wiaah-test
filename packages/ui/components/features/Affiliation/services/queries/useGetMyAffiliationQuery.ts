import { Exact, Maybe } from "types";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  Affiliation,
  GetMyAffiliationsInput,
} from "@features/Affiliation/types";
import { Service } from "@features/Services";
import { Product } from "@features/Products";

export type GetAffiliationsQueryVariables = Exact<{
  args: GetMyAffiliationsInput;
}>;

export type GetAffiliationsQuery = { __typename?: "Query" } & {
  getMyAffiliations: Array<
    { __typename?: "Affiliation" } & Pick<
      Affiliation,
      | "commision"
      | "createdAt"
      | "expireAt"
      | "id"
      | "itemId"
      | "itemType"
      | "sellerId"
      | "updatedAt"
      | "status"
    > & {
        product?: Maybe<
          { __typename?: "Product" } & Pick<
            Product,
            "id" | "thumbnail" | "title"
          >
        >;
        service?: Maybe<
          { __typename?: "Service" } & Pick<Service, "id" | "serviceType">
        >;
      }
  >;
};

export const useGetMyAffiliationQuery = (input: GetMyAffiliationsInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getAffiliations(
        $args:GetMyAffiliationsInput!
    ){
        getMyAffiliations(
            args:$args
        ){
            commision
            createdAt
            expireAt
            id
            itemId
            itemType
            product{
                id
            }
            sellerId
            service{
                id
                type
            }
            updatedAt
        }
    }
    `);

  client.setVariables<GetAffiliationsQueryVariables>({
    args: input,
  });

  return useQuery(["my-affiliations"], async () => {
    const res = await client.send<GetAffiliationsQuery>();

    return res.data.getMyAffiliations;
  });
};
