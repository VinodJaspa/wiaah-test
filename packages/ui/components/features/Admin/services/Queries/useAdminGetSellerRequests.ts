import {
  Account,
  Exact,
  GetAdminPendingSellersInput,
  Shop,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetSellerRequestsQueryVariables = Exact<{
  args: GetAdminPendingSellersInput;
}>;

export type AdminGetSellerRequestsQuery = { __typename?: "Query" } & {
  getPendingSellers: Array<
    { __typename?: "Account" } & Pick<
      Account,
      | "companyRegisterationNumber"
      | "firstName"
      | "lastName"
      | "email"
      | "createdAt"
      | "photo"
      | "id"
    > & { shop: { __typename?: "Shop" } & Pick<Shop, "id"> }
  >;
};

type args = AdminGetSellerRequestsQueryVariables["args"];
export const adminGetSellerRequestsQueryKey = (args: args) => [
  "admin-seller-requests",
  { args },
];

export const adminGetSellerRequestsFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetSellerRequests($args:GetAdminPendingSellersInput!){
  getPendingSellers(args:$args){
    companyRegisterationNumber
    firstName
    lastName
    email
    createdAt
    photo
    id
    shop {
      id
    }
  }
}
    `);
  const res = await client
    .setVariables<AdminGetSellerRequestsQueryVariables>({ args })
    .send<AdminGetSellerRequestsQuery>();
  return res.data.getPendingSellers;
};
export const useAdminGetSellerRequestsQuery = (args: args) =>
  useQuery(adminGetSellerRequestsQueryKey(args), () =>
    adminGetSellerRequestsFetcher(args)
  );
