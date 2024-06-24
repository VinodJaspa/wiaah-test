import { Category, UpdateCategoryInput } from "@features/API";
import { GqlResponse } from "@UI/../types/src";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export const useUpdateProductCategory = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation update(
        $args:UpdateCategoryInput!
    ){
        updateProductCategory(
            updateCategoryArgs:$args
        ){
            id
            name
            sortOrder
            parantId
            status
        }
    }
    `);

  return useMutation<unknown, unknown, UpdateCategoryInput>(
    "update-category",
    async (args) => {
      const res = await client
        .setVariables({ args })
        .send<GqlResponse<Category, "updateProductCategory">>();
      return res.data.data.updateProductCategory;
    }
  );
};
