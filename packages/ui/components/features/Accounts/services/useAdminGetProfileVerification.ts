import { AccountVerificationStatus, Exact } from "../../../features/API";
import { createGraphqlRequestClient } from "api";
import { UseQueryOptions, useQuery } from "react-query";

export type GetAdminProfileVerificationRequestQueryVariables = Exact<{
  id: string;
}>;

export type GetAdminProfileVerificationRequestQuery = {
  __typename?: "Query";
  adminGetProfileVerificationRequest: {
    __typename?: "AccountVerification";
    id: string;
    fullName: string;
    idPhoto: string;
    status: AccountVerificationStatus;
    username: string;
  };
};

type args = GetAdminProfileVerificationRequestQueryVariables;
export const useAdminGetProfileVerificationQuery = (
  args: args,
  options?: UseQueryOptions<
    GetAdminProfileVerificationRequestQuery["adminGetProfileVerificationRequest"],
    any,
    GetAdminProfileVerificationRequestQuery["adminGetProfileVerificationRequest"],
    any
  >,
) =>
  useQuery(
    ["admin-get-profile-verification-request", { args }],
    async () => {
      const client = createGraphqlRequestClient();
      const res = await client
        .setQuery(
          `
    query getAdminProfileVerificationRequest($id:String!){
    adminGetProfileVerificationRequest(
        id:$id
    ){
        id
        fullName
        idPhoto
        status
        username
    }
}
    `,
        )
        .setVariables<GetAdminProfileVerificationRequestQueryVariables>(args)
        .send<GetAdminProfileVerificationRequestQuery>();

      return res.data.adminGetProfileVerificationRequest;
    },
    options,
  );
