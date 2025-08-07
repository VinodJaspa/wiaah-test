import { Exact } from "types";
import { createGraphqlRequestClient } from "api";
import { Mutation } from "../../../features/API";
import { useMutation } from "react-query";

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  __typename?: "Mutation";
  logout: boolean;
};

export const useLogoutMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation logout {
      logout
    }
  `);

  return useMutation<boolean, unknown, void>(
    ["logout"],
    async () => {
      const res = await client.send<LogoutMutation>();
      return res.data.logout as boolean;
    }
  );
};
