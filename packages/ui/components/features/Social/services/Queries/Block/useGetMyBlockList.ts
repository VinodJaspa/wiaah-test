import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import { Block, GetMyBlocklistInput, Profile } from "@features/API";

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
            "photo" | "username" | "id" | "verified"
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
            verified
        }
    }
}`);

  return useQuery(["block-list"], async () => {
    const mockRes: GetMyBlocklistQuery["getMyBlockList"] = [...Array(10)].map(
      (v, i) => ({
        blockedAt: new Date().toString(),
        blockedUserId: "test",
        id: "test",
        blockedProfile: {
          id: "test",
          photo: "/profile (3).jfif",
          username: "user-" + i,
          verified: true,
        },
      })
    );

    return mockRes;
    const res = await client.send<GetMyBlocklistQuery>();

    return res.data.getMyBlockList;
  });
};
