import { AskForRefundInput, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AskForRefundMutationVariables = Exact<{
  args: AskForRefundInput;
}>;

export type AskForRefundMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "askForRefund"
>;

export const useAskForRefundMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation askForRefund(
  $args:AskForRefundInput!
){
  askForRefund(askForRefundArgs:$args)
}
    `);

  return useMutation<
    AskForRefundMutation["askForRefund"],
    unknown,
    AskForRefundMutationVariables["args"]
  >(["ask-for-refund"], async (args) => {
    const res = await client
      .setVariables<AskForRefundMutationVariables>({
        args,
      })
      .send<AskForRefundMutation>();

    return res.data.askForRefund;
  });
};
