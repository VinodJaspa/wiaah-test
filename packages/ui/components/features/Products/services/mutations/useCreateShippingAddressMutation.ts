import { CreateShippingAddressInput, Mutation } from "@features/API";
import { createGraphqlRequestClient, Exact } from "api";
import { useMutation } from "react-query";

export type CreateShippingAddressMutationVariables = Exact<{
  args: CreateShippingAddressInput;
}>;

export type CreateShippingAddressMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createShippingAddress"
>;

export const useCreateShippingAddressMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation createShippingAddress(
  $args:CreateShippingAddressInput!
) {
  createShippingAddress(
   args:$args 
  )
}
    `);

  return useMutation<boolean, unknown, CreateShippingAddressInput>(
    ["create-shipping-address"],
    async (data) => {
      const res = await client
        .setVariables<CreateShippingAddressMutationVariables>({ args: data })
        .send<CreateShippingAddressMutation>();

      return res.data.createShippingAddress;
    }
  );
};
