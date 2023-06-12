import {
  AccountVerificationStatus,
  Exact,
  GetAccountVerificationRequestsInput,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetAccountVerificationRequestsQueryVariables = Exact<{
  args: GetAccountVerificationRequestsInput;
}>;

export type AdminGetAccountVerificationRequestsQuery = {
  __typename?: "Query";
  getAccountVerificationRequests: Array<{
    __typename?: "AccountVerification";
    id: string;
    fullName: string;
    idPhoto: string;
    status: AccountVerificationStatus;
    createdAt: any;
  }>;
};

type args = AdminGetAccountVerificationRequestsQueryVariables["args"];

export const useAdminGetAccountVerifciationRequestsQuery = (args: args) =>
  useQuery(["get-accounts-verifications-requests", { args }], async () => {
    const client = createGraphqlRequestClient();

    const res = await client
      .setQuery(
        `
query adminGetAccountVerificationRequests($args:GetAccountVerificationRequestsInput!){
    getAccountVerificationRequests(
        args:$args
    ){
        id
        fullName
        idPhoto
        status
        createdAt
        
    }
}
    `
      )
      .setVariables<AdminGetAccountVerificationRequestsQueryVariables>({
        args,
      })
      .send<AdminGetAccountVerificationRequestsQuery>();

    return res.data.getAccountVerificationRequests;
  });
