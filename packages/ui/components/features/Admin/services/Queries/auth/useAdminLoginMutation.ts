import { Exact, GqlStatusResponse, LoginDto } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminLoginMutationVariables = Exact<{
  args: LoginDto;
}>;

export type AdminLoginMutation = { __typename?: "Mutation" } & {
  adminLogin: { __typename?: "GqlStatusResponse" } & Pick<
    GqlStatusResponse,
    "code" | "message" | "success"
  >;
};

export const useAdminLoginMutation = () =>
  useMutation<
    AdminLoginMutation["adminLogin"],
    unknown,
    AdminLoginMutationVariables["args"]
  >(["admin-login"], async (args) => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
mutation adminLogin($args:LoginDto!){
  adminLogin(args:$args){
    code
    message
    success
  }
}
  `);

    client.setVariables<AdminLoginMutationVariables>({
      args,
    });

    const res = await client.send<AdminLoginMutation>();

    return res.data.adminLogin;
  });
