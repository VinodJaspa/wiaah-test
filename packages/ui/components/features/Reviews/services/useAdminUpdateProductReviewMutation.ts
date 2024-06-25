import { Exact, UpdateProductReviewInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminUpdateReviewMutationVariables = Exact<{
  args: UpdateProductReviewInput;
}>;

export type AdminUpdateReviewMutation = {
  __typename?: "Mutation";
  adminUpdateProductReview: boolean;
};

export const useAdminUpdateProductReviewMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation adminUpdateReview(
    $args:UpdateProductReviewInput!
){
    adminUpdateProductReview(
        args:$args
    )
}
`);

  return useMutation<
    boolean,
    unknown,
    AdminUpdateReviewMutationVariables["args"]
  >(async (args) => {
    const res = await client
      .setVariables<AdminUpdateReviewMutationVariables>({ args })
      .send<AdminUpdateReviewMutation>();

    return res.data.adminUpdateProductReview;
  });
};
