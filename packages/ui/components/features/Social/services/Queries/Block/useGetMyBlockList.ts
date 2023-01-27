import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import {
  Block,
  GetMyBlocklistInput,
  Profile,
} from "@features/Social/services/types";

export type GetMyBlocklistQueryVariables = Exact<{
  args: GetMyBlocklistInput;
}>;

export type GetMyBlocklistQuery = { __typename?: "Query" } & {
  getMyBlockList: Array<
    { __typename?: "Block" } & Pick<
      Block,
      "id" | "blockedAt" | "blockedUserId"
    > & {
        blockedProfile?: Maybe<
          { __typename?: "Profile" } & Pick<
            Profile,
            "photo" | "username" | "id"
          >
        >;
      }
  >;
};

export const useGetMyBlockListQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getMyBlocklist(
    $args:GetMyBlocklistInput!
){
    getMyBlockList(
        args:$args
    ){
        id
        blockedAt
        blockedUserId
        blockedProfile{
            photo
            username
            id
        }
    }
}`);

  return useQuery(["block-list"], async () => {
    const res = await client.send<GetMyBlocklistQuery>();

    return res.data.getMyBlockList;
  });
};
