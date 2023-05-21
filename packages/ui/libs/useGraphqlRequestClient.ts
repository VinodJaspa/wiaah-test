import { GraphqlRequestClient, createGraphqlRequestClient } from "@UI/../api";
import { atom, useRecoilState } from "recoil";

export const graphqlRequestCtx = atom<GraphqlRequestClient>({
  default: createGraphqlRequestClient(),
  key: "graphql-request-client",
});

export const useGraphqlRequestClient = () => {
  const [client] = useRecoilState(graphqlRequestCtx);
  return { client };
};
