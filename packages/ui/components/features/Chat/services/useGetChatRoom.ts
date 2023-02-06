import {
  Account,
  ChatRoom,
  Exact,
  Maybe,
  Profile,
  Scalars,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetChatRoomQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetChatRoomQuery = { __typename?: "Query" } & {
  getChatRoom: { __typename?: "ChatRoom" } & Pick<
    ChatRoom,
    "createdAt" | "id" | "roomType" | "unSeenMessages" | "updatedAt"
  > & {
      members: Array<
        { __typename?: "Account" } & Pick<Account, "id"> & {
            profile?: Maybe<
              { __typename?: "Profile" } & Pick<
                Profile,
                "id" | "username" | "photo" | "activeStatus"
              >
            >;
          }
      >;
    };
};

export const useGetChatRoomQuery = (id: string) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getChatRoom(
  $id:String!
){
  getChatRoom(roomId:$id) {
    createdAt
    id
    roomType
    unSeenMessages
    updatedAt
    members{
      id
      profile {
        id
        username
        photo
        activeStatus
      }
    }
  }
}
    `);

  client.setVariables<GetChatRoomQueryVariables>({
    id,
  });

  return useQuery(["chat", "room", id], async () => {
    const res = await client.send<GetChatRoomQuery>();

    return res.data.getChatRoom;
  });
};
