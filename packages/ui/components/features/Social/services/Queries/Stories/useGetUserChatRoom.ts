import { createGraphqlRequestClient } from "@UI/../api";
import { ChatRoom, Exact, Scalars } from "@features/API";
import { UseQueryOptions, useMutation, useQuery } from "react-query";

export type GetRoomWithUserQueryVariables = Exact<{
  userId: Scalars["String"];
}>;

export type GetRoomWithUserQuery = { __typename?: "Query" } & {
  getRoomWithUser: { __typename?: "ChatRoom" } & Pick<ChatRoom, "id">;
};

type args = GetRoomWithUserQueryVariables;
export const getUserChatRoomQueryKey = (args: args) => [
  "get-user-chat-room",
  { args },
];

export const getUserChatRoomQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `query getRoomWithUser(
  $userId:String!
){
  getRoomWithUser(userId:$userId) {
    id
  }
}`
    )
    .setVariables<GetRoomWithUserQueryVariables>(args)
    .send<GetRoomWithUserQuery>();

  return res.data.getRoomWithUser;
};

export const useGetUserChatRoomQuery = () =>
  useMutation<GetRoomWithUserQuery["getRoomWithUser"], any, args>(
    ["user-chat-room-mutation"],
    (args) => getUserChatRoomQueryFetcher(args)
  );
