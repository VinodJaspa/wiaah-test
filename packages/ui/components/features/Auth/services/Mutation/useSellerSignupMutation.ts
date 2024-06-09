import { CreateAccountInput, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type SellerSignupMutationVariables = Exact<{
  args: CreateAccountInput;
}>;

export type SellerSignupMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "register"
>;

export const useSignupMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(
    `
mutation sellerSignup(
  $args:CreateAccountInput!
){
  register(RegisterInput:$args)
}
    `
  );

  return useMutation<string, unknown, SellerSignupMutationVariables["args"]>(
    "seller-signup",
    async (args) => {
      console.log("send mu");
      const res = await client
        .setVariables<SellerSignupMutationVariables>({
          args: {
            ...args,
          },
        })
        .send<SellerSignupMutation>();

      return res.data.register;
    }
  );
};
