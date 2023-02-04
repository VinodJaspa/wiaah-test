import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export const useBuyerSignupMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(
    `
      mutation registerSeller(
        $email:String!
        $firstName:String!
        $lastName:String!
        $password:String!
        $confirmPassword:String!
    ){
        register(
            RegisterInput:{
                firstName:$firstName
                lastName:$lastName
                email:$email
                password:$password
                confirmPassword:$confirmPassword
                accountType:buyer
            }
        )
    }
    `
  );

  return useMutation<
    unknown,
    unknown,
    {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
      confirmPassword: string;
    }
  >("buyer-register", (vars) => client.setVariables(vars).send());
};
