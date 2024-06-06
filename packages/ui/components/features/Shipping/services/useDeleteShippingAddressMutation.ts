import { Exact, Mutation, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type DeleteShippingAddressMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type DeleteShippingAddressMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteShippingAddress"
>;

export const useDeleteShippingAddressMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`

    `);

  return useMutation<
    boolean,
    unknown,
    DeleteShippingAddressMutationVariables["id"]
  >(["delete-shipping-address"], async (id) => {
    const res = await client
      .setVariables<DeleteShippingAddressMutationVariables>({
        id,
      })
      .send<DeleteShippingAddressMutation>();

    return res.data.deleteShippingAddress;
  });
};
