import { Exact, Mutation, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AccpetRefundRequestMutationVariables = Exact<{
  id: Scalars["ID"]["output"];
}>;

export type AccpetRefundRequestMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "acceptRefundRequest"
>;

export const useAcceptRefundRequestMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        mutation accpetRefundRequest(
            $id:ID!
        ){
            acceptRefundRequest(
                id:$id
            )
        }
    `);

  return useMutation<
    boolean,
    unknown,
    AccpetRefundRequestMutationVariables["id"]
  >(["accept-refund-request"], async (id) => {
    const res = await client
      .setVariables<AccpetRefundRequestMutationVariables>({ id })
      .send<AccpetRefundRequestMutation>();

    return res.data.acceptRefundRequest;
  });
};
