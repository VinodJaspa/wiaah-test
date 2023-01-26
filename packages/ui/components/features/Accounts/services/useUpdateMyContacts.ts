import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import { useMutation } from "react-query";
import { AddContactInput, Mutation } from "@features/Accounts";

export type UpdateMyContactsMutationVariables = Exact<{
  args: AddContactInput;
}>;

export type UpdateMyContactsMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "updateMyContact"
>;

export const useUpdateMyContacts = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation updateMyContacts(
        $args:AddContactInput!
    ){
        updateMyContact(
            args:$args
        )
    }
    `);

  return useMutation<boolean, unknown, AddContactInput>(
    ["update-contact"],
    async (data) => {
      const res = await client
        .setVariables<UpdateMyContactsMutationVariables>({
          args: data,
        })
        .send<UpdateMyContactsMutation>();
      return res.data.updateMyContact;
    }
  );
};
