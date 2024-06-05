import { Exact, Hashtag, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminSuspenseHashtagMutationVariables = Exact<{
  tag: Scalars["String"]["input"];
}>;

export type AdminSuspenseHashtagMutation = { __typename?: "Mutation" } & {
  updateHashtag: { __typename?: "Hashtag" } & Pick<Hashtag, "id">;
};

export const useAdminSuspenseHashtag = () =>
  useMutation<
    AdminSuspenseHashtagMutation["updateHashtag"],
    unknown,
    AdminSuspenseHashtagMutationVariables["tag"]
  >(["admin-suspense-hashtag"], async (tag: string) => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
mutation adminSuspenseHashtag($tag:String!){
  updateHashtag(args:{
    status:suspended
    tag:$tag
  }){
    id
  }
}
    `);

    const res = await client
      .setVariables<AdminSuspenseHashtagMutationVariables>({
        tag,
      })
      .send<AdminSuspenseHashtagMutation>();

    return res.data.updateHashtag;
  });
