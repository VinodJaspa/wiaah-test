import { ApplyVoucherInput, Exact, ShoppingCart } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type ApplyVoucherMutationVariables = Exact<{
  args: ApplyVoucherInput;
}>;

export type ApplyVoucherMutation = { __typename?: "Mutation" } & {
  applyVoucher: { __typename?: "ShoppingCart" } & Pick<ShoppingCart, "id">;
};

export const useApplyVoucherMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation applyVoucher(
  $args:ApplyVoucherInput!
){
  applyVoucher(args:$args){
    id
  }
}
    `);

  return useMutation<
    ApplyVoucherMutation["applyVoucher"],
    unknown,
    ApplyVoucherMutationVariables["args"]
  >(["apply-voucher"], async (args) => {
    const res = await client
      .setVariables<ApplyVoucherMutationVariables>({ args })
      .send<ApplyVoucherMutation>();

    return res.data.applyVoucher;
  });
};
