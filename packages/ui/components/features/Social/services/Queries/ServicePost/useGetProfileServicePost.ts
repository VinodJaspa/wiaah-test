import { Exact, Maybe } from "types";
import { createGraphqlRequestClient } from "api";
import {
  GetUserServicesPostsInput,
  Profile,
  ServicePost,
} from "@features/Social/services/types";
import { Service } from "@features/Services";
import { useQuery } from "react-query";

export type GetProfileServicePostsQueryVariables = Exact<{
  args: GetUserServicesPostsInput;
}>;

export type GetProfileServicePostsQuery = { __typename?: "Query" } & {
  getUserServicePosts: Array<
    { __typename?: "ServicePost" } & Pick<
      ServicePost,
      | "id"
      | "userId"
      | "comments"
      | "reactionNum"
      | "serviceId"
      | "shares"
      | "createdAt"
      | "views"
    > & {
        user: { __typename?: "Account" } & {
          profile?: Maybe<
            { __typename?: "Profile" } & Pick<
              Profile,
              "photo" | "username" | "id" | "profession"
            >
          >;
        };
        service: { __typename?: "Service" } & Pick<
          Service,
          "id" | "thumbnail" | "title" | "hashtags"
        >;
      }
  >;
};

export const useGetProfileServicePostQuery = (
  args: GetUserServicesPostsInput
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getProfileServicePosts(
            $args:GetUserServicesPostsInput!
        ){
            getUserServicePosts(
                args:$args
            ){
                id
                userId
                comments
                reactionNum
                serviceId
                shares
                createdAt
                views
                user{
                  profile{
                      photo
                      username
                      id
                      profession
                  }
                }
                service {
                    id
                    thumbnail
                    title
                    hashtags
                }
            }
        }
    `);

  client.setVariables<GetProfileServicePostsQueryVariables>({
    args,
  });

  return useQuery(["get-profile-services-posts", { args }], async () => {
    const res = await client.send<GetProfileServicePostsQuery>();

    return res.data.getUserServicePosts;
  });
};
