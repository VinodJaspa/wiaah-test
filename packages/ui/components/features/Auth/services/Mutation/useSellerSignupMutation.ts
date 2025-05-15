import { CreateAccountInput, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type SellerSignupMutationVariables = Exact<{
  args: CreateAccountInput;
}>;

type SellerSignupMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "register"
>;

export const useSignupMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation SellerRegister($args: CreateAccountInput!) {
      register(RegisterInput: $args)
    }
  `);

  return useMutation<string, unknown, SellerSignupMutationVariables["args"]>(
    "seller-signup",
    async (args) => {
      try {
        const res :any= await client
          .setVariables<SellerSignupMutationVariables>({
            args: { ...args },
          })
          .send<SellerSignupMutation>();
          console.log("GraphQL response errors:", res);
        // If GraphQL returned errors, throw them
        if (res?.errors && res.errors.length > 0) {
          throw new Error(res.errors[0].message || "Signup failed");
        }
        const result = res?.data?.register;
        if (!result) {
          throw new Error("No data returned from server.");
        }
        return result;
      } catch (error: any) {
        // Print the full error for debugging
        console.error("GraphQL error caught:", error);

        const gqlMessage = error?.response?.errors?.[0]?.message;
        throw new Error(gqlMessage || error.message || "Signup failed.");
      }
    }
  );
};

