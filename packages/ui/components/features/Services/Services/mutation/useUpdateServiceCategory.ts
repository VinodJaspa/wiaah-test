import { createGraphqlRequestClient } from "api";
import { UpdateCategoryInput, Category } from "@features/services/Services";
import { useMutation } from "react-query";
import { GqlResponse } from "@UI/../types/src";

export const useUpdateServiceCategory = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        mutation updateCate(
            $args:UpdateCategoryInput!
        ){
            updateServiceCategory(
                updateServiceCategoryArgs:$args
            ){
                id
            }
        }        
    `);

  return useMutation<unknown, any, UpdateCategoryInput, any>(
    "update-service-category",
    async (data) => {
      const res = await client
        .setVariables<{ args: UpdateCategoryInput }>({
          args: data,
        })
        .send<GqlResponse<Pick<Category, "id">, "updateServiceCategory">>();
    }
  );
};
