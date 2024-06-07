import { createGraphqlRequestClient } from "api";
import { Exact, Maybe, Scalars } from "types";
import { PostLocation, Profile, ServicePost } from "@features/API";
import { Service } from "@features/API";
import { Account } from "@features/API";
import { useQuery } from "react-query";

export type GetServicePostQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetServicePostQuery = { __typename?: "Query" } & {
  getServicePost: { __typename?: "ServicePost" } & Array<Pick<
    ServicePost,
    | "id"
    | "reactionNum"
    | "shares"
    | "comments"
    | "createdAt"
    | "userId"
    | "serviceId"
    | "serviceType"
    | "views"
  > & {
      location: { __typename?: "PostLocation" } & Pick<
        PostLocation,
        "address" | "city" | "country" | "state"
      >;
      service: { __typename?: "Service" } & Pick<
        Service,
        "id"  | "title" | "thumbnail" | "price" | "rating" 
      >;
      user: { __typename?: "Account" } & Pick<Account, "id"> & {
          profile?: Maybe<
            { __typename?: "Profile" } & Pick<
              Profile,
              "id" | "username" | "photo" | "profession" | "verified" |"followers"
            >
          >;
        };
    }>
};

export const useGetServicePostDetails = (id: string) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getServicePost(
        $id:String!
    ){
        getServicePost(
            id:$id
        ){
            id
            reactionNum
            shares
            comments
            createdAt
            userId
            createdAt
            location {
                address
                city
                country
                state
            }
            serviceId
            service {
                id
            }
            serviceType
            views
            user {
                id
                profile{
                    id
                    username
                    photo
                    profession
                    verified
                }
            }
        }
    }
    `);

  client.setVariables<GetServicePostQueryVariables>({
    id,
  });

  return useQuery(["service-post-details"], async () => {
    const res = await client.send<GetServicePostQuery>();

    return res.data.getServicePost;
  });
};
