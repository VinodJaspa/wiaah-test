import { Exact, GetVouchersInput, Maybe, Voucher } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetMyVouchersQueryVariables = Exact<{
  args?: Maybe<GetVouchersInput>;
}>;

export type GetMyVouchersQuery = { __typename?: "Query" } & {
  getMyVouchers: Array<
    { __typename?: "Voucher" } & Pick<
      Voucher,
      "amount" | "code" | "currency" | "createdAt" | "status"
    >
  >;
};

export const useGetMyVouchersQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getMyVouchers(
  $args:GetVouchersInput
){
  getMyVouchers(getMyVouchersInput:$args){
    amount
    code
    currency
    createdAt
    status
  }
}
    `);

  return useQuery(["get-my-vouchers"], async () => {
    const res = await client.send<GetMyVouchersQuery>();

    return res.data.getMyVouchers;
  });
};
