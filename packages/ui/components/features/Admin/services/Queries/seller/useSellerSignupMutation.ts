import { createGraphqlRequestClient } from "api/src/utils";
import { useMutation } from "react-query";
import { Exact, Scalars } from "types";
import { GqlStatusResponse } from "nest-utils";

export type useSellerSignupMutationVariables = Exact<{
  args: {
    email: Scalars["String"];
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    password: Scalars["String"];
    confirmPassword: Scalars["String"];
  };
}>;

export type SellerSignupMutation = { __typename?: "Mutation" } & {
  sellerSignup: { __typename?: "GqlStatusResponse" } & Pick<
    GqlStatusResponse,
    "code" | "message" | "success"
  >;
};

export const useSellerSignupMutation = () =>
  useMutation<
    SellerSignupMutation["sellerSignup"],
    unknown,
    useSellerSignupMutationVariables["args"]
  >(["seller-signup"], async (args) => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
      mutation register($args:any!){
        sellerSignup(args:$args){
          code
          message
          success
        }
      }
  `);

    client.setVariables<useSellerSignupMutationVariables>({
      args,
    });

    const res = await client.send<SellerSignupMutation>();

    return res.data.sellerSignup;
  });
