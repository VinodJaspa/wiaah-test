import { CreateAccountInput, Exact } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export type SellerSignupMutationVariables = Exact<{
  args: CreateAccountInput;
}>;

type SellerSignupMutation = {
  __typename?: "Mutation";
  register: string;
};

export const useSignupMutation = () => {
  return useMutation<string, unknown, CreateAccountInput>({
    mutationKey: "seller-signup",
    mutationFn: async (formData: CreateAccountInput) => {
      const client = createGraphqlRequestClient();
      client.setQuery(`
        mutation SellerRegister($args: CreateAccountInput!) {
          register(RegisterInput: $args)
        }
      `);

      client.setVariables({ args: formData });
      try {
        const response = await client.send<{ register: string }>();
        if (response?.data?.register) {
          // toast.success("Signup successful");
          return response.data.register;
        }
        // If no `register` field returned, show error
        throw new Error("Signup failed");
      } 
      catch (err: any) {
        const graphQLErrors = err?.response?.errors;

        const message =
          graphQLErrors?.[0]?.message ||
          err?.message ||
          "Unknown signup error";
        console.error("Signup error full response:", err);
        throw new Error(message);
      }
    },
  });
};
