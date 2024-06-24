import {
  Exact,
  FinancialAccount,
  FinancialAccountType,
  GetMyWithdrawalRequestsInput,
  WithdrawalRequest,
  WithdrawalStatus,
} from "@features/API";
import { randomNum } from "@UI/../utils/src";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetMyWithdrawalsQueryVariables = Exact<{
  args: GetMyWithdrawalRequestsInput;
}>;

export type GetMyWithdrawalsQuery = { __typename?: "Query" } & {
  getMyWithdrawalRequests: Array<
    { __typename?: "WithdrawalRequest" } & Pick<
      WithdrawalRequest,
      "id" | "amount" | "processedAt" | "requestedAt" | "status" | "userId"
    > & {
      financialAccount: { __typename?: "FinancialAccount" } & Pick<
        FinancialAccount,
        "type" | "label" | "id"
      >;
    }
  >;
};

type args = GetMyWithdrawalsQueryVariables["args"];

export const getMyWithdrawalsQueryKey = (args: args) => [
  "get-my-withdrawals",
  { args },
];

export const getMyWithdrwalsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getMyWithdrawals($args:GetMyWithdrawalRequestsInput!){
  getMyWithdrawalRequests(args:$args){
    id
    amount
    processedAt
    requestedAt
    status
    userId
    financialAccount {
      type
      label
      id
    }
  }
}
  `);

  const mockRes: GetMyWithdrawalsQuery["getMyWithdrawalRequests"] = [
    ...Array(15),
  ].map((v, i) => ({
    amount: randomNum(100),
    financialAccount: {
      id: "test",
      label: "Stripe",
      type: FinancialAccountType.Bank,
    },
    id: "test",
    processedAt: new Date().toDateString(),
    requestedAt: new Date().toString(),
    status: WithdrawalStatus.Processed,
    userId: "test",
  }));

  return mockRes;
  const res = await client
    .setVariables<GetMyWithdrawalsQueryVariables>({ args })
    .send<GetMyWithdrawalsQuery>();

  return res.data.getMyWithdrawalRequests;
};

export const useGetMyWithdrawalsQuery = (args: args) =>
  useQuery(getMyWithdrawalsQueryKey(args), () =>
    getMyWithdrwalsQueryFetcher(args)
  );
