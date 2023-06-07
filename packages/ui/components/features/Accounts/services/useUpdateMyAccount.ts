import { createGraphqlRequestClient } from "api";
import { Account, Exact, UpdateAccountInput } from "@features/API";
import { useMutation } from "react-query";

export type UpdateMyAccountMutationVariables = Exact<{
  args: UpdateAccountInput;
}>;

export type UpdateMyAccountMutation = { __typename?: "Mutation" } & {
  editAccount: { __typename?: "Account" } & Pick<Account, "id">;
};

export const useUpdateAccountMutation = () => {
  return useMutation<
    UpdateMyAccountMutation["editAccount"],
    unknown,
    UpdateMyAccountMutationVariables["args"]
  >(async (args) => {
    const client = createGraphqlRequestClient();

    const res = await client
      .setQuery(
        `
    mutation updateMyAccount($args:UpdateAccountInput!){
        editAccount(editAccountInput:$args){
            id
        }
    }
`
      )
      .setVariables<UpdateMyAccountMutationVariables>({ args })
      .send<UpdateMyAccountMutation>();

    return res.data.editAccount;
  });
};
