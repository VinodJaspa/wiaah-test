import { SubtractFromDate, getRandomName, isDev } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  Account,
  Exact,
  Maybe,
  NotificationType,
  Profile,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { NotificationPaginationResponse, Notification } from "@entities";
export type GetMyNotificationsQueryQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetMyNotificationsQueryQuery = { __typename?: "Query" } & {
  getMyNotifications: { __typename?: "NotificationPaginationResponse" } & Pick<
    NotificationPaginationResponse,
    "total"
  > & {
    data: Array<
      { __typename?: "Notification" } & Pick<
        Notification,
        | "id"
        | "userId"
        | "authorId"
        | "createdAt"
        | "type"
        | "content"
        | "thumbnail"
      > & {
        author?: Maybe<
          { __typename?: "Account" } & Pick<Account, "id"> & {
            profile?: Maybe<
              { __typename?: "Profile" } & Pick<
                Profile,
                "username" | "photo"
              >
            >;
          }
        >;
      }
    >;
  };
};

export const useGetMyNotificationsQuery = () =>
  useQuery(
    ["get-my-notifications"],
    async () => {
      if (isDev) {
        const mockRes: GetMyNotificationsQueryQuery["getMyNotifications"] = {
          data: [
            {
              authorId: "",
              content: "",
              createdAt: new Date().toUTCString(),
              id: "",
              type: NotificationType.Follow,
              userId: "",
              author: {
                id: "",
                profile: {
                  photo: getRandomImage(),
                  username: `${getRandomName().firstName} ${getRandomName().lastName
                    }`,
                },
              },
            },
            {
              authorId: "",
              content: "",
              createdAt: SubtractFromDate(new Date(), { days: 1 }),
              id: "",
              type: NotificationType.OrderCanceled,
              userId: "",
              author: {
                id: "",
                profile: {
                  photo: getRandomImage(),
                  username: `${getRandomName().firstName} ${getRandomName().lastName
                    }`,
                },
              },
            },
            {
              authorId: "",
              content: "",
              createdAt: SubtractFromDate(new Date(), { days: 1 }),
              id: "",
              type: NotificationType.OrderDelivered,
              userId: "",
              author: {
                id: "",
                profile: {
                  photo: getRandomImage(),
                  username: `${getRandomName().firstName} ${getRandomName().lastName
                    }`,
                },
              },
            },
            {
              authorId: "",
              content: "",
              createdAt: SubtractFromDate(new Date(), { days: 1 }),
              id: "",
              type: NotificationType.Follow,
              userId: "",
              author: {
                id: "",
                profile: {
                  photo: getRandomImage(),
                  username: `${getRandomName().firstName} ${getRandomName().lastName
                    }`,
                },
              },
            },
            {
              authorId: "",
              content: "",
              createdAt: SubtractFromDate(new Date(), { days: 2 }),
              id: "",
              type: NotificationType.PostReacted,
              userId: "",
              author: {
                id: "",
                profile: {
                  photo: getRandomImage(),
                  username: `${getRandomName().firstName} ${getRandomName().lastName
                    }`,
                },
              },
            },
            {
              authorId: "",
              content: "",
              createdAt: SubtractFromDate(new Date(), { days: 2 }),
              id: "",
              type: NotificationType.PostCommented,
              userId: "",
              author: {
                id: "",
                profile: {
                  photo: getRandomImage(),
                  username: `${getRandomName().firstName} ${getRandomName().lastName
                    }`,
                },
              },
            },
            {
              authorId: "",
              content: "",
              createdAt: SubtractFromDate(new Date(), { days: 2 }),
              id: "",
              type: NotificationType.PostMention,
              userId: "",
              author: {
                id: "",
                profile: {
                  photo: getRandomImage(),
                  username: `${getRandomName().firstName} ${getRandomName().lastName
                    }`,
                },
              },
            },
            {
              authorId: "",
              content: "",
              createdAt: SubtractFromDate(new Date(), { days: 8 }),
              id: "",
              type: NotificationType.StoryReacted,
              userId: "",
              author: {
                id: "",
                profile: {
                  photo: getRandomImage(),
                  username: `${getRandomName().firstName} ${getRandomName().lastName
                    }`,
                },
              },
            },
          ],
          total: 4,
        };

        return mockRes;
      }

      const client = createGraphqlRequestClient();

      client.setQuery(`
    query getMyNotificationsQuery{
	getMyNotifications{total
    data{
      id
      userId
      authorId
      createdAt
      type
      content
      thumbnail
      author {
        id
        profile {
          username
          photo
          
        }
      }
    }
    
  }
}
    `);
      const res = await client.send<GetMyNotificationsQueryQuery>();

      return res?.data?.getMyNotifications;
    },
    { cacheTime: 0 }
  );
