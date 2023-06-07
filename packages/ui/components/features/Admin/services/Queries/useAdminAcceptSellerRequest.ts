import { Exact, Mutation, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AcceptSellerRequestMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type AcceptSellerRequestMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "acceptSellerAccount"
>;

export const useAdminAcceptSellerRequestMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
  mutation acceptSellerRequest($id:String!){
  acceptSellerAccount(id:$id)
}
  `);

  return useMutation<
    boolean,
    unknown,
    AcceptSellerRequestMutationVariables["id"]
  >(["accept-seller-account"], async (id) => {
    const res = await client
      .setVariables<AcceptSellerRequestMutationVariables>({ id })
      .send<AcceptSellerRequestMutation>();

    return res.data.acceptSellerAccount;
  });
};
