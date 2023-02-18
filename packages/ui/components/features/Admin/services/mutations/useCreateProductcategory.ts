import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";
import { Category, CreateCategoryInput, Exact } from "@features/API";

export type CreateMutationVariables = Exact<{
  args: CreateCategoryInput;
}>;

export type CreateMutation = { __typename?: "Mutation" } & {
  createProductCategory: { __typename?: "Category" } & Pick<
    Category,
    "id" | "name" | "parantId" | "sortOrder" | "status"
  >;
};

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
      const res = await client.setVariables({ args }).send<CreateMutation>();
      return res.data.createProductCategory;
    }
  );
};
