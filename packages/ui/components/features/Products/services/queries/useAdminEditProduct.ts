import { Exact } from "types";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";
import { Mutation, UpdateProductInput } from "../../../../features/API";

export type AdminUpdateProductMutationVariables = Exact<{
  args: UpdateProductInput;
}>;

export type AdminUpdateProductMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "updateProductAdmin"
>;

export const useAdminEditProductMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
   mutation adminUpdateProduct(
        $args:UpdateProductInput!
    ){
        updateProductAdmin(
            args:$args
        )
    }
    `);

  return useMutation<boolean, unknown, UpdateProductInput>(
    ["updateAdminProduct"],
    async (data) => {
      client.setVariables<AdminUpdateProductMutationVariables>({
        args: data,
      });
      const res = await client.send<AdminUpdateProductMutation>();

      return res?.data.updateProductAdmin ?? false;
    },
  );
};
