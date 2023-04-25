import { createGraphqlRequestClient } from "@UI/../api";
import {
  Account,
  Exact,
  Location,
  Profile,
  RawShop,
  Scalars,
  Shop,
  TranslationText,
} from "@features/API";
import { useQuery } from "react-query";

export type GetAccountSettingsQueryQueryVariables = Exact<{
  userId: Scalars["String"];
}>;

export type GetAccountSettingsQueryQuery = { __typename?: "Query" } & {
  getProfileDetails: { __typename?: "Profile" } & Pick<
    Profile,
    "id" | "username" | "photo" | "bio"
  >;
  getUserRawShop: { __typename?: "RawShop" } & Pick<
    RawShop,
    "id" | "storeType" | "type" | "businessType" | "storeFor" | "phone"
  > & {
      description: Array<
        { __typename?: "TranslationText" } & Pick<
          TranslationText,
          "langId" | "value"
        >
      >;
      name: Array<
        { __typename?: "TranslationText" } & Pick<
          TranslationText,
          "langId" | "value"
        >
      >;
      location: { __typename?: "Location" } & Pick<
        Location,
        "city" | "country" | "address" | "state" | "postalCode"
      >;
    };
  getUserAccount: { __typename?: "Account" } & Pick<
    Account,
    "id" | "firstName" | "lastName" | "companyRegisterationNumber" | "phone"
  >;
};

type args = GetAccountSettingsQueryQueryVariables;
export const getAccountSettingsQueryKey = (args: args) => [
  "get-account-settings",
  { args },
];

export const getAccountSettingsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getAccountSettingsQuery($userId:String!) {
  getProfileDetails(userId:$userId){
    id
    username
    photo
    bio
  }
  
  getUserRawShop(userId:$userId){
    id
    storeType
    type
    businessType
    description {
      langId
      value
    }
    name{
      langId
      value
    }
    storeFor
    location {
      city
      country
      address
      state
      postalCode
    }
    phone
  }
  
  getUserAccount(userId:$userId){
    id
    firstName
    lastName
    companyRegisterationNumber
    phone
    
  }
}
    `
    )
    .setVariables<GetAccountSettingsQueryQueryVariables>(args)
    .send<GetAccountSettingsQueryQuery>();

  return {
    shop: res.data.getUserRawShop,
    account: res.data.getUserAccount,
    profile: res.data.getProfileDetails,
  };
};

export const useGetAccountSettingsQuery = (args: args) =>
  useQuery(getAccountSettingsQueryKey(args), () =>
    getAccountSettingsQueryFetcher(args)
  );
