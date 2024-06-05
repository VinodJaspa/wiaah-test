import { Exact, Mutation, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminDeleteNewsfeedPostMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type AdminDeleteNewsfeedPostMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "adminDeleteNewsfeedPost">;

export const useAdminDeleteNewsfeedPostMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation adminDeleteNewsfeedPost($id:String!) {
  adminDeleteNewsfeedPost(id:$id)
}`);

  return useMutation<
    AdminDeleteNewsfeedPostMutation["adminDeleteNewsfeedPost"],
    unknown,
    AdminDeleteNewsfeedPostMutationVariables["id"]
  >(["delete-admin-newsfeed-post"], async (data) => {
    const res = await client
      .setVariables<AdminDeleteNewsfeedPostMutationVariables>({
        id: data,
      })
      .send<AdminDeleteNewsfeedPostMutation>();
    return res.data.adminDeleteNewsfeedPost;
  });
};
