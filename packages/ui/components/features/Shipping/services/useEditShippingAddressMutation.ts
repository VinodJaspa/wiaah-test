import { Exact, Mutation, UpdateShippingAddressInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type EditShippingAddressMutationVariables = Exact<{
  args: UpdateShippingAddressInput;
}>;

export type EditShippingAddressMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "updateShippingAddress"
>;

export const useEditShippingAddressMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation EditShippingAddress(
  $args:UpdateShippingAddressInput!
){
  updateShippingAddress(
    args:$args
  )
}        
    `);

  return useMutation<
    boolean,
    unknown,
    EditShippingAddressMutationVariables["args"]
  >(["edit-shipping-address"], async (data) => {
    const res = await client
      .setVariables<EditShippingAddressMutationVariables>({
        args: data,
      })
      .send<EditShippingAddressMutation>();

    return res.data.updateShippingAddress;
  });
};
