import { createGraphqlRequestClient } from "@UI/../api";
import { CreateShopInput, Exact, Shop } from "@features/API";
import { useMutation } from "react-query";

export type CreateShopMutationVariables = Exact<{
  args: CreateShopInput;
}>;

export type CreateShopMutation = { __typename?: "Mutation" } & {
  createShop: { __typename?: "Shop" } & Pick<Shop, "id">;
};

export const useCreateShopMutation = () => {
  return useMutation<boolean, any, CreateShopMutationVariables>(
    ["create-shop"],
    async (args) => {
      const client = createGraphqlRequestClient();

      client.setQuery(`
mutation createShop($args:CreateShopInput!){
  createShop(createShopInput:$args){
    id
  }
}        
    `);

      const res = await client
        .setVariables<CreateShopMutationVariables>(args)
        .send<CreateShopMutation>();

      return !!res.data.createShop;
    }
  );
};
