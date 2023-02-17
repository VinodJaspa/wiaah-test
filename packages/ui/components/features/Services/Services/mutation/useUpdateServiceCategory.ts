import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";
import {
  Exact,
  ServiceCategory,
  UpdateServiceCategoryInput,
} from "@features/API";

export type UpdateServiceCategoryMutationVariables = Exact<{
  args: UpdateServiceCategoryInput;
}>;

export type UpdateServiceCategoryMutation = { __typename?: "Mutation" } & {
  updateServiceCategory: { __typename?: "ServiceCategory" } & Pick<
    ServiceCategory,
    "id"
  >;
};

export const useUpdateServiceCategory = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation updateServiceCategory($args:UpdateServiceCategoryInput!){
  updateServiceCategory(updateServiceCategoryArgs:$args){
    id
  }
}     
    `);

  return useMutation<unknown, any, UpdateServiceCategoryInput, any>(
    "update-service-category",
    async (data) => {
      const res = await client
        .setVariables<UpdateServiceCategoryMutationVariables>({
          args: data,
        })
        .send<UpdateServiceCategoryMutation>();

      return res.data.updateServiceCategory;
    }
  );
};
