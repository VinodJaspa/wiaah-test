import { Exact, Maybe } from "@features/API";
import { GetVouchersInput } from "@features/API/gql/generated";

import { VoucherStatus, Voucher } from "@features/API/gql/generated";
import { randomNum } from "@UI/../utils/src";
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
    const mockRes: GetMyVouchersQuery["getMyVouchers"] = [...Array(5)].map(
      () => ({
        amount: randomNum(150),
        code: "VOUCHERCODE",
        createdAt: new Date().toString(),
        currency: "USD",
        status: VoucherStatus.Active,
      })
    );

    return mockRes;
    const res = await client.send<GetMyVouchersQuery>();

    return res.data.getMyVouchers;
  });
};
