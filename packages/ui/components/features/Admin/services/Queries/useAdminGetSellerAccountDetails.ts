import {
  Account,
  Exact,
  Maybe,
  Profile,
  Scalars,
  ServiceDetails,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetSellerQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type AdminGetSellerQuery = { __typename?: "Query" } & {
  adminGetAccount: { __typename?: "Account" } & Pick<
    Account,
    | "photo"
    | "firstName"
    | "lastName"
    | "email"
    | "companyRegisterationNumber"
    | "createdAt"
  > & {
      profile?: Maybe<{ __typename?: "Profile" } & Pick<Profile, "bio">>;
      service: { __typename?: "ServiceDetails" } & Pick<
        ServiceDetails,
        "id" | "type"
      >;
    };
};

type args = AdminGetSellerQueryVariables["id"];

export const adminGetSellerAccountDetailsQueryKey = (args: args) => [
  "admin-seller-account-details",
  { args },
];

export const adminGetSellerAccountDetailsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetSeller($id:String!) {
  adminGetAccount(id:$id){
    photo
    firstName
    lastName
    email
    companyRegisterationNumber
    profile{
      bio
    }
   	createdAt 
    service {
      id
      type
    }
  }
}`);

  const res = await client
    .setVariables<AdminGetSellerQueryVariables>({ id: args })
    .send<AdminGetSellerQuery>();

  return res.data.adminGetAccount;
};

export const useAdminGetSellerAccountDetailsQuery = (args: args) =>
  useQuery(adminGetSellerAccountDetailsQueryKey(args), () =>
    adminGetSellerAccountDetailsQueryFetcher(args)
  );
