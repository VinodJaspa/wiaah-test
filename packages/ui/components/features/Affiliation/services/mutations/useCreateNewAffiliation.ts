import {
  Affiliation,
  CreateAffiliationInput,
} from "@features/Affiliation/types";
import { createGraphqlRequestClient } from "@UI/../api";
import { GqlResponse } from "@UI/../types/src";
import { useMutation } from "react-query";

export const useCreateNewAffiliationMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation create(
        $args:CreateAffiliationInput!
    ) {
        createNewAffiliationProduct(
            args:$args
        ){
            id
        }
    }
    `);

  return useMutation<any, any, { args: CreateAffiliationInput }>(
    ["create-affiliation"],
    async (vars) => {
      const res = await client
        .setVariables(vars)
        .send<GqlResponse<Affiliation, "createNewAffiliationProduct">>();

      return res.data.createNewAffiliationProduct;
    }
  );
};
