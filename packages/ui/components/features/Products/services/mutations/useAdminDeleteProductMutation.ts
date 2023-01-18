import { Mutation } from "@features/Products/types";
import { createGraphqlRequestClient } from "@UI/../api";
import { useMutation } from "react-query";
import { Exact, Scalars } from "types";

type AdminDeleteProductMutationVariables = Exact<{
  id: Scalars["String"];
  reason: Scalars["String"];
}>;

type AdminDeleteProductMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "adminDeleteProduct"
>;

export const useAdminDeleteProductMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation adminDeleteProduct(
        $id:String!
        $reason:String!
    ){
        adminDeleteProduct(
            id:$id
            reason:$reason
        )
    }
    `);

  return useMutation<boolean, unknown, AdminDeleteProductMutationVariables>(
    ["admin-delete-product"],
    async (data) => {
      const res = await client
        .setVariables<AdminDeleteProductMutationVariables>(data)
        .send<AdminDeleteProductMutation>();

      return res.data.adminDeleteProduct;
    }
  );
};
