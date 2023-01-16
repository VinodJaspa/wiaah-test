import { Category } from "@features/Products";
import { CreateCategoryInput } from "@features/Products/types";
import { GqlResponse } from "types";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export const useCreateProductCategory = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation create(
        $args:CreateCategoryInput!
    ){
        createProductCategory(
            createCategoryInput:$args
        ){
            id
            name
            parantId
            sortOrder
            status
        }
    }
    `);

  return useMutation<unknown, unknown, CreateCategoryInput>(
    "create-category",
    async (args) => {
      const res = await client
        .setVariables({ args })
        .send<GqlResponse<Category, "createProductCategory">>();
      return res.data.createProductCategory;
    }
  );
};
