import {
  ChatMessage,
  ChatRoom,
  Exact,
  GqlPaginationInput,
  Maybe,
  Profile,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetMyChatRoomsQueryVariables = Exact<{
  msgsArgs: GqlPaginationInput;
}>;

export type GetMyChatRoomsQuery = { __typename?: "Query" } & {
  getMyChatRooms: Array<
    { __typename?: "ChatRoom" } & Pick<
      ChatRoom,
      "createdAt" | "id" | "roomType" | "unSeenMessages" | "membersUserIds"
    > & {
        members: Array<
          { __typename?: "Account" } & {
            profile?: Maybe<
              { __typename?: "Profile" } & Pick<
                Profile,
                "activeStatus" | "username" | "photo"
              >
            >;
          }
        >;
        messages: Array<
          { __typename?: "ChatMessage" } & Pick<ChatMessage, "content">
        >;
      }
  >;
};

export const useGetMyChatRoomsQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getMyChatRooms(
  $msgsArgs:GqlPaginationInput!
) {
  getMyChatRooms {
    createdAt
    id
    roomType
    unSeenMessages
    membersUserIds
    members {
      profile{
        activeStatus
        username
        photo
      }
    }
    messages (
      args:$msgsArgs
    ){
      content
    }
  }
}
    `);

  client.setVariables<GetMyChatRoomsQueryVariables>({
    msgsArgs: {
      page: 1,
      take: 1,
    },
  });

  return useQuery(["get-my-chat-rooms"], async () => {
    const res = await client.send<GetMyChatRoomsQuery>();

    return res.data.getMyChatRooms;
  });
};
