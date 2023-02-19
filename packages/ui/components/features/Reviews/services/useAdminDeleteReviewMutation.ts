import { Exact, Mutation, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useMutation } from "react-query";

export type AdminDeleteProductReviewMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type AdminDeleteProductReviewMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "adminDeleteProductReview">;

export const useAdminDeleteProductReviewMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation adminDeleteProductReview(
  $id:String!
){
  adminDeleteProductReview(id:$id)
}
`);

  return useMutation<
    boolean,
    unknown,
    AdminDeleteProductReviewMutationVariables["id"]
  >(["admin-delete-review"], async (id) => {
    const res = await client
      .setVariables<AdminDeleteProductReviewMutationVariables>({ id })
      .send<AdminDeleteProductReviewMutation>();

    return res.data.adminDeleteProductReview;
  });
};
