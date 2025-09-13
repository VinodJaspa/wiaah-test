import { Exact, Mutation, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type VerifyMutationVariables = Exact<{
  input: {
    verificationCode: Scalars["String"]["input"];
    email: Scalars["String"]["input"];
  };
}>;

export type VerifyMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "verifyEmail"
>;

export const useVerifyEmailMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation verify($input: VerifyEmailDto!) {
      verifyEmail(EmailVerificationInput: $input)
    }
  `);

  return useMutation<
    boolean, // response type
    unknown, // error type
    {
      code: string;
      email: string;
    }
  >("verify-email", async ({ code, email }) => {
    const res = await client
      .setVariables({ input: { verificationCode: code, email } })
      .send<VerifyMutation>();

    return res.data.verifyEmail;
  });
};
