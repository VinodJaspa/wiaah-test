import { LoginDto } from "@features/API/gql/generated";
import { createGraphqlRequestClient } from "api/src/utils/GraphqlRequestClient";
import { useMutation } from "react-query";

type args = {
  email: string;
  password: string;
};

export const SigninFetcher = (args: LoginDto) => {
  const client = createGraphqlRequestClient();

  client.setQuery(
    `
      mutation login($args){
        login(
            LoginInput:{
                email:$email
                password:$password
            }
        ) {
            code
            message
            success
        }
    }
    `
  );

  return client.setVariables(args).send<{ access_token: string }>();
};

export const useSigninMutation = () => {
  return useMutation<unknown, unknown, args>((input) => SigninFetcher(input));
};
