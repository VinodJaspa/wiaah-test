import { Exact, Maybe } from "types";
import { createGraphqlRequestClient } from "api";
import { GetUserServicesPostsInput, Profile, ServicePost } from "@features/API";
import { Service } from "@features/API";
import { useQuery } from "react-query";
import { isDev } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";

export type GetProfileServicePostsQueryVariables = Exact<{
  args: GetUserServicesPostsInput;
}>;

export type GetProfileServicePostsQuery = { __typename?: "Query" } & {
  getUserServicePosts: Array<
    { __typename?: "ServicePost" } & Pick<ServicePost, "id" | "userId"> & {
        service: { __typename?: "Service" } & Pick<
          Service,
          "id" | "thumbnail" | "name"
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
                service {
                    id
                    thumbnail
                    name
                }
            }
        }
    `);

  client.setVariables<GetProfileServicePostsQueryVariables>({
    args,
  });

  return useQuery(["get-profile-services-posts", { args }], async () => {
    if (isDev) {
      const mockRes: GetProfileServicePostsQuery["getUserServicePosts"] = [
        ...Array(15),
      ].map(() => ({
        id: "",
        service: {
          id: "",
          name: "",
          thumbnail: getRandomImage(),
        },
        userId: "",
      }));

      return mockRes;
    }
    const res = await client.send<GetProfileServicePostsQuery>();

    return res.data.getUserServicePosts;
  });
};
