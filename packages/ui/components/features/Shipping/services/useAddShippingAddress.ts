import { CreateShippingAddressInput, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AddShippingAddressMutationVariables = Exact<{
  args: CreateShippingAddressInput;
}>;

export type AddShippingAddressMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createShippingAddress"
>;

export const useAddShippingAddress = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation addShippingAddress(
  $args:CreateShippingAddressInput!
){
  createShippingAddress(
    args:$args
  )
}
    `);

  return useMutation<
    boolean,
    unknown,
    AddShippingAddressMutationVariables["args"]
  >(["add-shipping-address"], async (data) => {
    const res = await client
      .setVariables<AddShippingAddressMutationVariables>({
        args: data,
      })
      .send<AddShippingAddressMutation>();

    return res.data.createShippingAddress;
  });
};
