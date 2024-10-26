import { GraphqlRequestClient } from "api";
import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";

// Create a lazy initialization for the GraphQL client to avoid SSR issues.
export const graphqlRequestCtx = atom<GraphqlRequestClient | null>({
  default: null,
  key: `graphql-request-client_${Date.now()}`,
});

export const useGraphqlRequestClient = () => {
  const [client, setClient] = useRecoilState(graphqlRequestCtx);
  const [isClientInitialized, setIsClientInitialized] = useState(false);

  useEffect(() => {
    // Initialize the GraphQL client only on the client side
    if (!client && typeof window !== "undefined") {
      const graphqlClient = new GraphqlRequestClient(
        "http://localhost:3003/graphql",
        {
          credentials: "include",
        },
      );
      setClient(graphqlClient);
      setIsClientInitialized(true);
    }
  }, [client, setClient]);

  return { client, isClientInitialized };
};
