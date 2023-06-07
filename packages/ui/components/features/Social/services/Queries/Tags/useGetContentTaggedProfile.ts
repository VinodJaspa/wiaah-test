import { createGraphqlRequestClient } from "api";
import { isDev } from "@UI/../utils/src";
import { randomNum } from "@UI/components/helpers";
import { getRandomImage } from "@UI/placeholder";
import {
  Exact,
  GetContentTaggedProfilesInput,
  Maybe,
  Profile,
  ProfileFollow,
  SocialTag,
} from "@features/API";
import { UseQueryOptions, useQuery } from "react-query";

export type GetSocialContentTaggedProfilesQueryVariables = Exact<{
  args: GetContentTaggedProfilesInput;
}>;

export type GetSocialContentTaggedProfilesQuery = { __typename?: "Query" } & {
  getContentTaggedProfile?: Maybe<
    { __typename?: "SocialTag" } & Pick<SocialTag, "contentId"> & {
        taggedProfiles: Array<
          { __typename?: "ProfileFollow" } & Pick<
            ProfileFollow,
            "id" | "ownerId" | "photo" | "username" | "verified" | "isFollowed"
          >
        >;
      }
  >;
};

type args = GetSocialContentTaggedProfilesQueryVariables["args"];

export const getContentTaggedProfilesQueryKey = (args: args) => [
  "content-tagged-profiles",
  { args },
];

export const getContentTaggedProfilesQueryFetcher = async (args: args) => {
  if (isDev) {
    return {
      contentId: args.contentId,
      taggedProfiles: [...Array(10)].map((_, i) => ({
        id: i.toString(),
        isFollowed: randomNum(100) > 50,
        ownerId: i.toString(),
        photo: getRandomImage(),
        username: `username-${i}`,
        verified: randomNum(100) > 50,
      })),
    } as GetSocialContentTaggedProfilesQuery["getContentTaggedProfile"];
  }

  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getSocialContentTaggedProfiles($args:GetContentTaggedProfilesInput!){
  getContentTaggedProfile(args:$args){
    contentId
    taggedProfiles{
      id
      ownerId
      photo
      username
      verified
      isFollowed
    }
  }
}
  `
    )
    .setVariables<GetSocialContentTaggedProfilesQueryVariables>({ args })
    .send<GetSocialContentTaggedProfilesQuery>();

  return res.data.getContentTaggedProfile;
};

export const useGetContentTaggedProfilesQuery = (
  args: args,
  options?: UseQueryOptions<
    any,
    any,
    GetSocialContentTaggedProfilesQuery["getContentTaggedProfile"],
    any
  >
) =>
  useQuery(
    getContentTaggedProfilesQueryKey(args),
    () => getContentTaggedProfilesQueryFetcher(args),
    options
  );
