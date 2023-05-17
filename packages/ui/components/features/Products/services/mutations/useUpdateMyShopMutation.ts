import { Exact, Shop, UpdateUserShopInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type UpdateMyShopMutationVariables = Exact<{
  args: UpdateUserShopInput;
}>;

export type UpdateMyShopMutation = { __typename?: "Mutation" } & {
  updateShop: { __typename?: "Shop" } & Pick<Shop, "id">;
};

export const useUpdateMyShopMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation updateMyShop($args:UpdateShopInput!) {
  updateMyShop(
    updateMyShopInput:$args
  ){
    id
  }
}
`);

  return useMutation<
    UpdateMyShopMutation["updateShop"],
    unknown,
    UpdateMyShopMutationVariables["args"]
  >(["update-shop"], async (data) => {
    const res = await client
      .setVariables<UpdateMyShopMutationVariables>({
        args: data,
      })
      .send<UpdateMyShopMutation>();

    return res.data.updateShop;
  });
};
