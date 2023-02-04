import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import { CreateIdentityVerificationInput, Mutation } from "@features/API";
import { useMutation } from "react-query";

export type RequestAccountVerificationMutationVariables = Exact<{
  args: CreateIdentityVerificationInput;
}>;

export type RequestAccountVerificationMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "requestIdVerification">;

export const useRequestAccountVerification = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        mutation RequestAccountVerification(
            $args:CreateIdentityVerificationInput!
        ){
            requestIdVerification(
                requestInput:$args
            )
        }
    `);

  return useMutation<
    RequestAccountVerificationMutation["requestIdVerification"],
    unknown,
    RequestAccountVerificationMutationVariables["args"]
  >(["request-account-verification"], async (data) => {
    const res = await client
      .setVariables<RequestAccountVerificationMutationVariables>({
        args: data,
      })
      .send<RequestAccountVerificationMutation>();

    return res.data.requestIdVerification;
  });
};
