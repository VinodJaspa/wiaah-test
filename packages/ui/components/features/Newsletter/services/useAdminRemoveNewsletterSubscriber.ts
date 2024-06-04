import { Exact, Mutation, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminRemoveNewsletterSubscriberMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type AdminRemoveNewsletterSubscriberMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "removeNewsletterSubscriber">;

export const useAdminRemoveNewsletterSubscriber = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation adminRemoveNewsletterSubscriber($id:ID!){
  removeNewsletterSubscriber(id:$id)
}
    `);

  return useMutation<
    boolean,
    unknown,
    AdminRemoveNewsletterSubscriberMutationVariables["id"]
  >(["admin-remove-subscriber"], async (id) => {
    const res = await client
      .setVariables<AdminRemoveNewsletterSubscriberMutationVariables>({ id })
      .send<AdminRemoveNewsletterSubscriberMutation>();
    return res.data.removeNewsletterSubscriber;
  });
};
