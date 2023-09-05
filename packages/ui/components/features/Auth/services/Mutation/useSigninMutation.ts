import { createGraphqlRequestClient } from "api/src/utils/GraphqlRequestClient";
import { useMutation } from "react-query";

type args = {
  email: string;
  password: string;
};

export const SigninFetcher = (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(
    `
      mutation login($email:String!, $password:String!){
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
