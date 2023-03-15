import { Exact, IdentityVerification } from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

export type GetMyVerificationQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyVerificationQuery = { __typename?: "Query" } & {
  getMyVerificationRequest: { __typename?: "IdentityVerification" } & Pick<
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

export const useGetMyVerificationRequest = () =>
  useQuery(["get-my-verification-request"], async () => {
    const client = createGraphqlRequestClient();
    client.setQuery(`query getMyVerification {
  getMyVerificationRequest {
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
}`);

    const res = await client
      .setVariables<GetMyVerificationQueryVariables>({})
      .send<GetMyVerificationQuery>();
    return res.data.getMyVerificationRequest;
  });
