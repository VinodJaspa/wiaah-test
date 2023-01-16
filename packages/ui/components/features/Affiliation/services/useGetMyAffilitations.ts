import { GqlResponse } from "types";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  Affiliation,
  GetMyAffiliationsInput,
} from "@features/Affiliation/types";

export const useGetMyAffiliations = (input: GetMyAffiliationsInput) => {
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

  client.setVariables({
    args: input,
  });

  return useQuery(["get-my-affiliations"], async () => {
    const res = await client.send<
      GqlResponse<Affiliation[], "getMyAffiliations">
    >();
    return res.data.getMyAffiliations;
  });
};
