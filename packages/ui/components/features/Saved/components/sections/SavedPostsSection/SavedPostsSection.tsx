import React from "react";
import { useTranslation } from "react-i18next";
import {
  SectionWrapper,
  SectionHeader,
  useGetUserSavedCollections,
  useGetMyAccountQuery,
  GetUserSavesCollectionsQuery,
  AspectRatio,
  Image,
} from "@UI";
import { mapArray } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";

//Placeholder
export const GetUserSavedCollectionPlaceholder: GetUserSavesCollectionsQuery["getUserSaveCollections"] =
  [
    {
      __typename: "SavesCollection",
      id: "collection-1",
      name: "Collection 1",
      recentSaves: [
        {
          __typename: "UserSavedPost",
          post: {
            __typename: "NewsfeedPost",
            thumbnail: getRandomImage(),
          },
        },
        {
          __typename: "UserSavedPost",
          post: {
            __typename: "NewsfeedPost",
            thumbnail: getRandomImage(),
          },
        },
      ],
    },
    {
      __typename: "SavesCollection",
      id: "collection-2",
      name: "Collection 2",
      recentSaves: [
        {
          __typename: "UserSavedPost",
          post: {
            __typename: "NewsfeedPost",
            thumbnail: getRandomImage(),
          },
        },
        {
          __typename: "UserSavedPost",
          post: {
            __typename: "NewsfeedPost",
            thumbnail: getRandomImage(),
          },
        },
      ],
    },
  ];

export const SavedPostsSection: React.FC = () => {
  const { t } = useTranslation();

  // WARNING: this graqphql query is not working right now so it has been replaced with placeholder once the graphql is ready replace it back
  const { data: _account } = useGetMyAccountQuery();
  const { data: _data } = useGetUserSavedCollections(
    { userId: _account?.id! },
    { enabled: !!_account?.id }
  );
  const data = GetUserSavedCollectionPlaceholder;
  return (
    <SectionWrapper>
      <SectionHeader sectionTitle={t("Saved")}></SectionHeader>
      <div className="flex gap-8 justify-center">
        {mapArray(data, (collection, i) => (
          <div
            key={collection.id + i}
            className="flex flex-col gap-2 items-center w-1/3"
          >
            <AspectRatio ratio={1}>
              {collection.recentSaves.length === 4 ? (
                <div className="grid grid-col-2">
                  {mapArray(collection.recentSaves, (savedPost, i) => (
                    <Image
                      key={i}
                      src={savedPost.post.thumbnail}
                      className="w-full h-full"
                    />
                  ))}
                </div>
              ) : (
                <Image
                  src={collection.recentSaves.at(0)?.post.thumbnail}
                  className="w-full h-full object-cover"
                />
              )}
            </AspectRatio>
            <p className="font-medium ">{collection.name}</p>
          </div>
        ))}
      </div>

      {!data || data.length < 1 ? (
        <div className="text-black font-bold text-2xl text-center py-60">
          {t("You Dont Have Any Saved Collections")}
        </div>
      ) : null}
    </SectionWrapper>
  );
};
