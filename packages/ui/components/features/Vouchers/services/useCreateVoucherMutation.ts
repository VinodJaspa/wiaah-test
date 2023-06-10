import { CreateVoucherInput, Exact, Voucher } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type CreateVoucherMutationVariables = Exact<{
  args: CreateVoucherInput;
}>;

export type CreateVoucherMutation = { __typename?: "Mutation" } & {
  createVoucher: { __typename?: "Voucher" } & Pick<Voucher, "code">;
};

export const useCreateVoucherMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    `);

  return useMutation<
    CreateVoucherMutation["createVoucher"],
    unknown,
    CreateVoucherMutationVariables["args"]
  >(["create-voucher"], async (data) => {
    const res = await client
      .setVariables<CreateVoucherMutationVariables>({
        args: data,
      })
      .send<CreateVoucherMutation>();
    return res.data.createVoucher;
  });
};
