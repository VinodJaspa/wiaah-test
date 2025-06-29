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

type GraphQLResponse<T> = {
  data?: T;
  errors?: readonly {
    message: string;
    extensions?: { [key: string]: any };
  }[];
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
        const res:any = await client
          .setVariables<SellerSignupMutationVariables>({ args })
          .send<SellerSignupMutation>();

        if (res.errors?.length) {
          const graphQLError = res.errors[0];
          throw new Error(graphQLError.message || "Signup failed");
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
        toast.error(error.message || "Something went wrong.");
      } else {
        toast.error("Unknown error occurred.");
      }
    },
  });
};
