import {
  Account,
  Exact,
  Maybe,
  Notification,
  NotificationPaginationResponse,
  Profile,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

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
          "id" | "userId" | "authorId" | "createdAt" | "type" | "content"
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
  useQuery(["get-my-notifications"], async () => {
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

    return res.data.getMyNotifications;
  });
