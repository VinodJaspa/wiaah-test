import { useMutation } from "react-query";
import { createGraphqlRequestClient } from "api";
import { AdminSendMailToUsersInput, Exact, Mutation } from "@features/API";

export type SendMailToUsersMutationVariables = Exact<{
  args: AdminSendMailToUsersInput;
}>;

export type SendMailToUsersMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "sendGeneralMail"
>;

export const useAdminSendMailToUsers = () => {
  return useMutation<
    boolean,
    unknown,
    SendMailToUsersMutationVariables["args"]
  >(["admin-send-mail"], async (args) => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
mutation sendMailToUsers($args:AdminSendMailToUsersInput!){
  sendGeneralMail(args:$args)
}
        `);

    const res = await client
      .setVariables<SendMailToUsersMutationVariables>({ args })
      .send<SendMailToUsersMutation>();
    return res.data.sendGeneralMail;
  });
};
