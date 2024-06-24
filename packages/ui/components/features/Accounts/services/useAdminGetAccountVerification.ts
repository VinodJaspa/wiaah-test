import { Exact, IdentityVerification, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetAccountVerificationRequestQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type AdminGetAccountVerificationRequestQuery = {
  __typename?: "Query";
} & {
  adminGetAccountVerification: { __typename?: "IdentityVerification" } & Pick<
    IdentityVerification,
    | "VVC"
    | "VVCPicture"
    | "acceptedById"
    | "addressProofBill"
    | "createdAt"
    | "dateOfBirth"
    | "firstName"
    | "fullAddress"
    | "id"
    | "id_back"
    | "id_front"
    | "lastName"
    | "updatedAt"
    | "userId"
  >;
};

export const useAdminGetAccountVerifficationRequest = (id: string) =>
  useQuery(["admin-get-account-verification", { id }], async () => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
query adminGetAccountVerificationRequest($id:String!){
  adminGetAccountVerification(accountId:$id){
    VVC
    VVCPicture
    acceptedById
    addressProofBill
    createdAt
    dateOfBirth
    firstName
    fullAddress
    id
    id_back
    id_front
    lastName
    updatedAt
    userId
  }
}
    `);

    const res = await client
      .setVariables<AdminGetAccountVerificationRequestQueryVariables>({
        id,
      })
      .send<AdminGetAccountVerificationRequestQuery>();

    return res.data.adminGetAccountVerification;
  });
