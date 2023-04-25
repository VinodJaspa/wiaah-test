import { SubtractFromDate, isDev } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  Account,
  ActiveStatus,
  ChatRoom,
  Exact,
  Maybe,
  Profile,
  RoomTypes,
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
                | "id"
                | "username"
                | "photo"
                | "activeStatus"
                | "lastActive"
                | "verified"
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

  return useQuery(
    ["chat", "room", id],
    async () => {
      if (isDev) {
        const mockRes: GetChatRoomQuery["getChatRoom"] = {
          id: "i".toString(),
          createdAt: new Date().toDateString(),
          members: [
            {
              id: "",
              profile: {
                id: "",
                username: "Nike",
                activeStatus: ActiveStatus.Active,
                photo: getRandomImage(),
                lastActive: SubtractFromDate(new Date(), {
                  minutes: 10,
                }).toString(),
                verified: true,
              },
            },
          ],
          roomType: RoomTypes.Group,
          unSeenMessages: 2,
          updatedAt: new Date().toDateString(),
        };

        return mockRes;
      }
      const res = await client.send<GetChatRoomQuery>();

      return res.data.getChatRoom;
    },
    {
      enabled: !!id,
    }
  );
};
