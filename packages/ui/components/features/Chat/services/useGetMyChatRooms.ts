import { isDev } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  ActiveStatus,
  ChatMessage,
  ChatMessageSeenBy,
  ChatRoom,
  Exact,
  GqlPaginationInput,
  Maybe,
  Profile,
  RoomTypes,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetMyChatRoomsQueryVariables = Exact<{ [key: string]: never }>;

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
                "ownerId" | "activeStatus" | "username" | "photo"
              >
            >;
          }
        >;
        messages: Array<
          { __typename?: "ChatMessage" } & Pick<
            ChatMessage,
            "content" | "createdAt" | "userId"
          > & {
              seenBy: Array<
                { __typename?: "ChatMessageSeenBy" } & Pick<
                  ChatMessageSeenBy,
                  "seenAt" | "userId"
                >
              >;
            }
        >;
      }
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
    members {
      profile{
        ownerId
        activeStatus
        username
        photo
      }
    }
    messages (
      args:{
        take:1
        page:1
      }
    ){
      content
      createdAt
      userId
      seenBy{
        seenAt
        userId
      }
    }
    
  }
}
    `);

  client.setVariables<GetMyChatRoomsQueryVariables>({});

  return useQuery(["get-my-chat-rooms"], async () => {
    if (isDev) {
      const mockRes: GetMyChatRoomsQuery["getMyChatRooms"] = [...Array(10)].map(
        (v, i) => ({
          id: i.toString(),
          createdAt: new Date().toDateString(),
          members: [
            {
              profile: {
                ownerId: "",
                username: "tes",
                activeStatus: ActiveStatus.Active,
                photo: getRandomImage(),
              },
            },
            {
              profile: {
                ownerId: "",
                username: "testa",
                activeStatus: ActiveStatus.Active,
                photo: getRandomImage(),
              },
            },
          ],
          membersUserIds: ["test", "test"],
          messages: [
            {
              content: "test",
              createdAt: new Date().toUTCString(),
              userId: "",
              seenBy: [
                {
                  seenAt: new Date().toUTCString(),
                  userId: "",
                },
              ],
            },
          ],
          roomType: RoomTypes.Group,
          unSeenMessages: 2,
        })
      );
      return mockRes;
    }
    const res = await client.send<GetMyChatRoomsQuery>();

    return res.data.getMyChatRooms;
  });
};
