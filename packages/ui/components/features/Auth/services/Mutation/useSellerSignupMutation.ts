import { CreateAccountInput, Exact, Mutation } from "@features/API";
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
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation SellerRegister($args: CreateAccountInput!) {
      register(RegisterInput: $args)
    }
  `);

  return useMutation<string, unknown, SellerSignupMutationVariables["args"]>({
    mutationKey: "seller-signup",
    mutationFn: async (args) => {
      try {
        const res = await client
          .setVariables<SellerSignupMutationVariables>({ args })
          .send<SellerSignupMutation>();

        if (res.errors?.length) {
          const graphQLError:any = res.errors[0];
          const code = graphQLError?.extensions?.errorCode;
          const message = graphQLError?.message || "Signup failed";

          // You could map known error codes here if needed
          throw new Error(`${code ? `(${code}) ` : ""}${message}`);
        }

        if (!res.data?.register) {
          throw new Error("Signup failed: No response data.");
        }

        return res.data.register;
      } catch (err: any) {
        console.error("Signup Error:", err);
        throw err;
      }
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
      
      }
    },
  });
};
