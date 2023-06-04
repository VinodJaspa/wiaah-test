import { createGraphqlRequestClient } from "@UI/../api";
import { isDev } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import { Account, Exact } from "@features/API";
import { useQuery } from "react-query";

export type GetMyAccountQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyAccountQuery = { __typename?: "Query" } & {
  getMyAccount: { __typename?: "Account" } & Pick<
    Account,
    | "email"
    | "firstName"
    | "lastName"
    | "id"
    | "photo"
    | "lang"
    | "currency"
    | "createdAt"
  >;
};

export const getMyAccountQueryKey = () => ["my-account"];

export const getMyAccountQueryFetcher = async () => {
  if (isDev) {
    const mockres: GetMyAccountQuery["getMyAccount"] = {
      id: "",
      currency: "usd",
      email: "test@email.com",
      firstName: "first",
      lastName: "last",
      lang: "en",
      createdAt: new Date().toDateString(),
      photo: getRandomImage(),
    };

    return mockres;
  }

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
    lang
    currency
    createdAt
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
