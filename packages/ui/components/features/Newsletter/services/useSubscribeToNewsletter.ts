import { Exact } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type SubToNewsletterMutationVariables = Exact<{
  email: string;
  name: string;
}>;

export type SubToNewsletterMutation = {
  __typename?: "Mutation";
  subscribeToNewsletter: boolean;
};

export const useSubscribeToNewsletterMutation = () =>
  useMutation<boolean, unknown, SubToNewsletterMutationVariables>(
    async (args) => {
      const client = createGraphqlRequestClient();

      const res = await client
        .setQuery(
          `
mutation subToNewsletter($email: String!, $name: String!) {
  subscribeToNewsletter(email: $email, name: $name)
}
    `
        )
        .setVariables<SubToNewsletterMutationVariables>(args)
        .send<SubToNewsletterMutation>();

      return res.data.subscribeToNewsletter;
    }
  );
