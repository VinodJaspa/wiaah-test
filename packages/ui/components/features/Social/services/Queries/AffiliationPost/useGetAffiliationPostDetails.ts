import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import {
  AffiliationPost,
  AffiliationStatus,
  GetAffiliationPostInput,
  PresentationType,
  Profile,
} from "@features/API";
import { Affiliation } from "@features/API";
import { Account } from "@features/API";
import { getRandomName, isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";

export type GetAffiliationPostDetailsQueryVariables = Exact<{
  args: GetAffiliationPostInput;
}>;

export type GetAffiliationPostDetailsQuery = { __typename?: "Query" } & {
  getAffiliationPost: { __typename?: "AffiliationPost" } & Pick<
    AffiliationPost,
    | "id"
    | "userId"
    | "affiliationId"
    | "views"
    | "reactionNum"
    | "shares"
    | "comments"
    | "createdAt"
  > & {
      affiliation: { __typename?: "Affiliation" } & Pick<
        Affiliation,
        | "id"
        | "commision"
        | "createdAt"
        | "itemId"
        | "itemType"
        | "product"
        | "service"
        | "status"
      >;
      user?: Maybe<
        { __typename?: "Account" } & Pick<Account, "id"> & {
            profile?: Maybe<
              { __typename?: "Profile" } & Pick<
                Profile,
                "id" | "username" | "verified" | "photo" | "ownerId"
              >
            >;
          }
      >;
    };
};

export const useGetAffiliationPostQuery = (args: GetAffiliationPostInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getAffiliationPostDetails(
        $args:GetAffiliationPostInput!
    ){
        getAffiliationPost(
            args:$args
        ){
            id
            userId
            affiliationId
            affiliation {
                id
            }
            comments
            reactionNum
            shares
            views
            createdAt
            user{
                id
                profile{
                    id
                    profession
                    photo
                    verified
                    username
                }
            }
        }
    }
    `);

  client.setVariables<GetAffiliationPostDetailsQueryVariables>({
    args,
  });

  return useQuery(["get-affiliation-post-details", { args }], async () => {
    if (isDev) {
      const mockRes: GetAffiliationPostDetailsQuery["getAffiliationPost"] = {
        id: "",
        comments: randomNum(51),
        affiliationId: "",
        createdAt: new Date().toUTCString(),
        reactionNum: randomNum(150),
        shares: randomNum(250),
        userId: "",
        views: randomNum(2650),
        affiliation: {
          commision: 15,
          createdAt: new Date().toUTCString(),
          itemType: "product",
          id: "",
          itemId: "",
          status: AffiliationStatus.Active,
          // ts-ignore used here to prevent creating a full product placeholder we do not need full product in this example
          // @ts-ignore
          product: {
            thumbnail: getRandomImage(),
            presentations: [
              {
                src: getRandomImage(),
                type: PresentationType.Image,
              },
              {
                src: getRandomImage(),
                type: PresentationType.Image,
              },
            ],
            title: [{langId:"en",value:"product title"}],
            price: randomNum(51),
          },

          // ts-ignore used here to prevent creating a full service placeholder we do not need full service in this example
          //@ts-ignore
          service: {
            name: "product title",
            thumbnail: getRandomImage(),
            price: randomNum(51),
          },
        },
        user: {
          id: "",
          profile: {
            id: "",
            ownerId: "",
            photo: getRandomImage(),
            username: getRandomName().firstName,
            verified: true,
          },
        },
      };
      return mockRes;
    }
    const res = await client.send<GetAffiliationPostDetailsQuery>();
    return res.data.getAffiliationPost;
  });
};
