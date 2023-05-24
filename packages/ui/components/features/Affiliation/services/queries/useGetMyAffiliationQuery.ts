import { Exact, Maybe } from "types";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  Affiliation,
  AffiliationStatus,
  GetMyAffiliationsInput,
  Product,
  Service,
  ServiceType,
} from "@features/API";
import { random } from "lodash";
import { getRandomImage } from "@UI/placeholder";
import { isDev } from "@UI/../utils/src";

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
          { __typename?: "Service" } & Pick<
            Service,
            "id" | "type" | "thumbnail" | "name"
          >
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
            product {
                id
            }
            sellerId
            service {
                id
                type
                name
            }
            updatedAt
        }
    }
    `);

  client.setVariables<GetAffiliationsQueryVariables>({
    args: input,
  });

  return useQuery(["my-affiliations"], async () => {
    if (isDev) {
      const mockRes: GetAffiliationsQuery["getMyAffiliations"] = [
        ...Array(10),
      ].map((v, i) => ({
        commision: random(5, 4),
        createdAt: new Date().toString(),
        expireAt: new Date().toString(),
        id: "test",
        itemId: "test",
        itemType: "Product",
        sellerId: "test",
        status: AffiliationStatus.Active,
        updatedAt: new Date().toString(),
        product: {
          id: "test",
          thumbnail: getRandomImage(),
          title: "product name",
        },
        service: {
          id: "test",
          name: "Body treatment - back pain treatment",
          type: ServiceType.Hotel,
          thumbnail: getRandomImage(),
        },
      }));

      return mockRes;
    }

    const res = await client.send<GetAffiliationsQuery>();

    return res.data.getMyAffiliations;
  });
};
