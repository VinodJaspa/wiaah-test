import { createGraphqlRequestClient } from "api/src/utils";
import { useMutation } from "react-query";

export const useSellerSignupMutation = () => {
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
                  accountType:seller
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
  >("seller-register", (vars) => client.setVariables(vars).send());
};
