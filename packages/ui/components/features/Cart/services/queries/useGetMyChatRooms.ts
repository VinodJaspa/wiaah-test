import { ChatRoom, Exact } from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

export type GetMyChatRoomsQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyChatRoomsQuery = { __typename?: "Query" } & {
  getMyChatRooms: Array<
    { __typename?: "ChatRoom" } & Pick<
      ChatRoom,
      "createdAt" | "id" | "roomType" | "unSeenMessages" | "membersUserIds"
    >
  >;
};

export const useGetMyChatRoomsQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getMyChatRooms {
  getMyChatRooms {
    createdAt
    id
    roomType
    unSeenMessages
    membersUserIds
  }
}
    `);

  return useQuery(["get-my-chat-rooms"], async () => {
    const res = await client.send<GetMyChatRoomsQuery>();

    return res.data.getMyChatRooms;
  });
};
