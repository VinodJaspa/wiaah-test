import { isDev } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  Account,
  ChatMessage,
  Exact,
  GetMessagesByRoomIdInput,
  Maybe,
  MessageAttachment,
  MessageAttachmentType,
  Profile,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useInfiniteQuery, useQuery } from "react-query";

export type GetChatRoomMessageQueryVariables = Exact<{
  args: GetMessagesByRoomIdInput;
}>;

export type GetChatRoomMessageQuery = { __typename?: "Query" } & {
  getRoomMessages: Array<
    { __typename?: "ChatMessage" } & Pick<
      ChatMessage,
      "content" | "createdAt" | "id"
    > & {
        attachments: Array<
          { __typename?: "MessageAttachment" } & Pick<
            MessageAttachment,
            "id" | "src" | "type"
          >
        >;
        user: { __typename?: "Account" } & Pick<Account, "id"> & {
            profile?: Maybe<
              { __typename?: "Profile" } & Pick<Profile, "username" | "photo">
            >;
          };
        mentions: Array<
          { __typename?: "Account" } & Pick<Account, "id"> & {
              profile?: Maybe<
                { __typename?: "Profile" } & Pick<
                  Profile,
                  "id" | "username" | "photo"
                >
              >;
            }
        >;
      }
  >;
};

export const useGetChatRoomMessagesQuery = (
  input: GetMessagesByRoomIdInput
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getChatRoomMessage(
  $args:GetMessagesByRoomIdInput!
){
  getRoomMessages(
    args:$args
  ){
     attachments{
        id
        src
        type
      }
      content
      createdAt
      id
      user {
        id
        profile {
          username
          photo
        }
      }
      mentions {
        id
        profile{
          id
          username
          photo
        }
      }
  }
}
    `);

  return useInfiniteQuery(
    ["chat", "room", "messages", { id: input.roomId }],
    async (cursor) => {
      if (isDev) {
        const mockRes: GetChatRoomMessageQuery["getRoomMessages"] = [
          {
            content: "test",
            createdAt: new Date().toDateString(),
            attachments: [
              {
                id: "",
                src: getRandomImage(),
                type: MessageAttachmentType.Image,
              },
            ],
            id: "",
            mentions: [],
            user: {
              id: "",
              profile: {
                photo: getRandomImage(),
                username: "test user name",
              },
            },
          },
          {
            content: "test",
            createdAt: new Date().toDateString(),
            attachments: [
              {
                id: "",
                src: "/video.mp4",
                type: MessageAttachmentType.VoiceMessage,
              },
            ],
            id: "",
            mentions: [],
            user: {
              id: "",
              profile: {
                photo: getRandomImage(),
                username: "test user name",
              },
            },
          },
          {
            content: "test 1",
            createdAt: new Date().toDateString(),
            attachments: [],
            id: "",
            mentions: [],
            user: {
              id: "",
              profile: {
                photo: getRandomImage(),
                username: "test user name",
              },
            },
          },
          {
            content: "test 2",
            createdAt: new Date().toDateString(),
            attachments: [],
            id: "",
            mentions: [],

            user: {
              id: "",
              profile: {
                photo: getRandomImage(),
                username: "test user name",
              },
            },
          },
          {
            content: "test",
            createdAt: new Date().toDateString(),
            attachments: [
              {
                id: "",
                src: getRandomImage(),
                type: MessageAttachmentType.Image,
              },
            ],
            id: "",
            mentions: [],
            user: {
              id: "",
              profile: {
                photo: getRandomImage(),
                username: "test user name",
              },
            },
          },
          {
            content: "test",
            createdAt: new Date().toDateString(),
            attachments: [
              {
                id: "",
                src: "/video.mp4",
                type: MessageAttachmentType.VoiceMessage,
              },
            ],
            id: "",
            mentions: [],
            user: {
              id: "",
              profile: {
                photo: getRandomImage(),
                username: "test user name",
              },
            },
          },
          {
            content: "test 1",
            createdAt: new Date().toDateString(),
            attachments: [],
            id: "",
            mentions: [],
            user: {
              id: "",
              profile: {
                photo: getRandomImage(),
                username: "test user name",
              },
            },
          },
          {
            content: "test 2",
            createdAt: new Date().toDateString(),
            attachments: [],
            id: "",
            mentions: [],

            user: {
              id: "",
              profile: {
                photo: getRandomImage(),
                username: "test user name",
              },
            },
          },
        ];

        return mockRes;
      }

      const res = await client
        .setVariables<GetChatRoomMessageQueryVariables>({
          args: {
            roomId: input.roomId,
            pagination: {
              take: input.pagination.take,
              cursor: cursor.pageParam,
            },
          },
        })
        .send<GetChatRoomMessageQuery>();

      return res.data.getRoomMessages;
    },
    {
      getNextPageParam: (last, all) => {
        return last.at(-1)?.id;
      },
      enabled: !!input.roomId && !!input.pagination.take,
    }
  );
};
