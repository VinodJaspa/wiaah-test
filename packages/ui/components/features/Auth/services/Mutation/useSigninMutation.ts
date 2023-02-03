import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export const useSigninMutation = () => {
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

  return useMutation<
    unknown,
    unknown,
    {
      email: string;
      password: string;
    }
  >("signin", (input) => client.setVariables(input).send(), {
    onMutate(variables) {
      console.log("mutate", variables);
    },
  });
};
