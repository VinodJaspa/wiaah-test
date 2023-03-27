import { Exact, Mutation, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type VerifyMutationVariables = Exact<{
  code: Scalars["String"];
}>;

export type VerifyMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "verifyEmail"
>;

export const useVerifyEmailMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(
    `
    mutation verify(
        $code:String!
    ){
        verifyEmail(
            EmailVerificationInput:{
                verificationCode:$code
            }
        )
    }
    `
  );

  return useMutation<
    VerifyMutation["verifyEmail"],
    unknown,
    {
      code: string;
    }
  >("verify-email", async (input) => {
    const res = await client
      .setVariables<VerifyMutationVariables>(input)
      .send<VerifyMutation>();
    return res.data.verifyEmail;
  });
};
