import { createGraphqlRequestClient } from "api/src/utils";
import { useMutation } from "react-query";

export const useBuyerSignupMutation = (input: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}) => {
  const client = createGraphqlRequestClient();

  client
    .setQuery(
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
    )
    .setVariables(input);

  return useMutation("buyer-register", () => client.send());
};
