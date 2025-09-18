import { Exact, Maybe } from "types";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  Affiliation,
  AffiliationStatus,
  Product,
  Service,
  ServiceType,
  StringTranslationField,
} from "@features/API";
import { GetMyAffiliationsInput } from "@features/API/gql/generated";
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
const toTranslation = (str: string): StringTranslationField[] => [
  { langId: "en", value: str },
];
export const useGetUserAffiliationQuery = (input: GetMyAffiliationsInput) => {
  return useQuery(["my-affiliations"], async () => {
    if (isDev) {
      const mockRes: GetAffiliationsQuery["getMyAffiliations"] = [...Array(10)].map((v, i) => ({
        __typename: "Affiliation",
        commision: random(4, 5),
        createdAt: new Date().toISOString(),
        expireAt: new Date().toISOString(),
        id: `test-${i}`,
        itemId: `item-${i}`,
        itemType: "Product",
        sellerId: `seller-${i}`,
        status: AffiliationStatus.Active,
        updatedAt: new Date().toISOString(),
        product: {
          __typename: "Product",
          id: `prod-${i}`,
          thumbnail: getRandomImage(),
          title: [{
            langId: "en",      // ✅ required
            value: "Product name",
          }],
        },
        service: {
          __typename: "Service",
          id: `service-${i}`,
          type: ServiceType.Hotel,
          thumbnail: getRandomImage(),
          name: "Service name",
        },
      }));


      return mockRes;
    }
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

    const res = await client.send<GetAffiliationsQuery>();

    return res.data.getMyAffiliations;
  });
};
