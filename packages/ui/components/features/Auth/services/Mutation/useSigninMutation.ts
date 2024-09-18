import { LoginDto, Exact, Mutation } from "@features/API/gql/generated";
import { createGraphqlRequestClient } from "api/src/utils/GraphqlRequestClient";
import { useMutation } from "react-query";

export type SigninMutationVariables = Exact<{
  args: LoginDto;
}>;

type SigninMutation = { __typename?: "Mutation" } & Pick<Mutation, "login">;

const client = createGraphqlRequestClient();

export const useSigninMutation = () => {
  client.setQuery(
    `
    mutation Login($args: LoginDto!) {
      login(LoginInput: $args) {
        code
        message
        success
        accessToken
      }
    }
    `
  );

  return useMutation<any | null, unknown, SigninMutationVariables["args"]>(
    "user-signin",
    async (args) => {
      const res = await client
        .setVariables<SigninMutationVariables>({
          args: {
            ...args,
          },
        })
        .send<SigninMutation>();

      return res.data.login;
    }
  );
};
