import { Category } from "@features/Products";
import {
  CreateCategoryInput,
  MutationDeleteProductCategoryArgs,
} from "@features/Products/types";
import { GqlResponse } from "types";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export const useDeleteProductCategory = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation delete(
        $id:String!
    ){
        deleteProductCategory(
            deleteCategoryId:$id
        ){
            id
            name
            parantId
            sortOrder
            status
        }
    }
    `);

  return useMutation<unknown, unknown, { id: string }>(
    "delete-category",
    async ({ id }) => {
      const res = await client
        .setVariables({ id })
        .send<GqlResponse<Category, "deleteProductCategory">>();
      return res.data.deleteProductCategory;
    }
  );
};
