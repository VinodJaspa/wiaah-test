import { createGraphqlRequestClient } from "@UI/../api";
import { isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import { Action } from "@features/API";
import { useInfiniteQuery } from "react-query";

type args = {};
export const getSimillarActionsQueryKey = (args: args) => [
  "simillar-actions-query",
  { args },
];

export const getSimillarActionsQueryFetcher = async (args: args) => {
  if (isDev) {
    const mockRes = [...Array(15)].map((_, i) => ({
      comments: randomNum(123456),
      reactionNum: randomNum(123456),
      shares: randomNum(123456),
      src: "/action.mp4",
      thumbnail: getRandomImage(),
      id: "",
    }));
    return mockRes;
  }

  const client = createGraphqlRequestClient();

  const res = await client.setQuery(``).setVariables().send();
  return res.data;
};

export const useGetSimillarActionsQuery = (args: args) =>
  useInfiniteQuery(getSimillarActionsQueryKey(args), () =>
    getSimillarActionsQueryFetcher(args)
  );
