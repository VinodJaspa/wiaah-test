import { Account, Exact } from "@features/API";
import { GetFilteredVouchers, Voucher } from "@features/API/gql/generated";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetVouchersQueryVariables = Exact<{
  args: GetFilteredVouchers;
}>;

export type AdminGetVouchersQuery = { __typename?: "Query" } & {
  getFilteredVouchers: Array<
    { __typename?: "Voucher" } & Pick<
      Voucher,
      "amount" | "code" | "createdAt" | "currency" | "status"
    > & { user: { __typename?: "Account" } & Pick<Account, "id" | "firstName"> }
  >;
};

type args = AdminGetVouchersQueryVariables["args"];
export const adminGetVouchersQueryKey = (args: args) => [
  "admin-get-vouchers",
  { args },
];

export const adminGetVouchersQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetVouchers(
  $args:GetFilteredVouchers!
){
  getFilteredVouchers(
    args:$args
  ){
    amount
    id
    code
    createdAt
    currency
    status
    user {
      id
    	firstName
    }
  }
}
  `);

  const res = await client
    .setVariables<AdminGetVouchersQueryVariables>({ args })
    .send<AdminGetVouchersQuery>();

  return res.data.getFilteredVouchers;
};

export const useAdminGetVouchersQuery = (args: args) =>
  useQuery(adminGetVouchersQueryKey(args), () =>
    adminGetVouchersQueryFetcher(args),
  );
