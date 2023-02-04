import { Exact, Mutation, RejectRefundRequestInput } from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useMutation } from "react-query";

export type RejectRefundRequestMutationVariables = Exact<{
  args: RejectRefundRequestInput;
}>;

export type RejectRefundRequestMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "rejectRefundRequest"
>;

export const useRejectRefundRequest = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation rejectRefundRequest(
        $args:RejectRefundRequestInput!
    ){
        rejectRefundRequest(
            args:$args
        )
    }
    `);

  return useMutation<
    boolean,
    unknown,
    RejectRefundRequestMutationVariables["args"]
  >(["reject-refund-request"], async (args) => {
    const res = await client
      .setVariables<RejectRefundRequestMutationVariables>({
        args,
      })
      .send<RejectRefundRequestMutation>();

    return res.data.rejectRefundRequest;
  });
};
