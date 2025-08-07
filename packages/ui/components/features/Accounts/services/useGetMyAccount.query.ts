import { createGraphqlRequestClient } from "api";
import { isDev } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import { AccountType, Exact } from "@features/API";
import { useQuery } from "react-query";

export type GetMyAccountQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyAccountQuery = {
  __typename?: "Query";
  getMyAccount: {
    __typename?: "Account";
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    idVerified: boolean;
    verified: boolean;
    online: boolean;
    status: string;
    accountType: AccountType;
    gender: string;
    sales: number;
    birthDate: string;
    photo?: string;
    lang: string;
    currency: string;
    createdAt: string;
    updatedAt: string;
    lastActiveAt?: string;
  };
};

export const getMyAccountQueryKey = () => ["my-account"];

export const getMyAccountQueryFetcher = async () => {
  if (isDev) {
    const mockres: GetMyAccountQuery["getMyAccount"] = {
      id: "mock_id",
      firstName: "Vinod",
      lastName: "Jaspa",
      email: "vintujaspa93@gmail.com",
      emailVerified: false,
      phoneVerified: false,
      idVerified: false,
      verified: false,
      online: false,
      status: "pending",
      accountType: AccountType.Seller,
      gender: "male",
      sales: 0,
      birthDate: "2025-03-15T00:00:00.000Z",
      photo: getRandomImage(),
      lang: "en",
      currency: "usd",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),

    };

    return mockres;
  }

  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
      query getMyAccount {
        getMyAccount {
          id
          firstName
          lastName
          email
          emailVerified
          phoneVerified
          idVerified
          verified
          online
          status
          accountType
          gender
          sales
          birthDate
          photo
          lang
          currency
          createdAt
          updatedAt
          lastActiveAt
          shareAdPartners
          shareAnalyticsTools
          shareSocialNetworks
          sharePaymentProcessors
          phone
          country
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
