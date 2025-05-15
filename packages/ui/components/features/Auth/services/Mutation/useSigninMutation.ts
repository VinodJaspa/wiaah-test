import { LoginDto, Exact, Mutation } from "@features/API/gql/generated";
import { createGraphqlRequestClient } from "api/src/utils/GraphqlRequestClient";
import { useMutation } from "react-query";

export type SigninMutationVariables = Exact<{
  args: LoginDto;
}>;

type SigninMutation = {
  __typename?: "Mutation";
  login: {
    code: string;
    message: string;
    success: boolean;
    accessToken: string;
  };
};

const client = createGraphqlRequestClient();

const LOGIN_MUTATION = `
  mutation Login($args: LoginDto!) {
    login(LoginInput: $args) {
      code
      message
      success
      accessToken
    }
  }
`;

export const useSigninMutation = () => {
  return useMutation({
    mutationKey: ['user-signin'],
    mutationFn: async (args: LoginDto) => {
      console.log("Login args:", args);
      const res:any = await client
        .setQuery(LOGIN_MUTATION)
        .setVariables<SigninMutationVariables>({ args })
        .send<SigninMutation>();
       
      return res.data?.login;
    },
  });
};
