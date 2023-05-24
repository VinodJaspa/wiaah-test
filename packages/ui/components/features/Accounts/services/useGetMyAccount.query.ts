import { createGraphqlRequestClient } from "@UI/../api";
import { Account, Exact } from "@features/API";
import { useQuery } from "react-query";

export type GetMyAccountQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyAccountQuery = { __typename?: "Query" } & {
  getMyAccount: { __typename?: "Account" } & Pick<
    Account,
    "email" | "firstName" | "lastName" | "id" | "photo"
  >;
};

export const getMyAccountQueryKey = () => ["my-account"];

export const getMyAccountQueryFetcher = async () => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getMyAccount{
  getMyAccount {
    email
    firstName
    lastName
    id
    photo
  }
}
  `
    )
    .setVariables<GetMyAccountQueryVariables>({})
    .send<GetMyAccountQuery>();

  return res.data.getMyAccount;
};

export const useGetMyAccountQuery = () =>
  useQuery(getMyAccountQueryKey(), () => getMyAccountQueryFetcher());
