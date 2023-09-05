import React from "react";
import { useTranslation } from "react-i18next";
import {
  SectionWrapper,
  SectionHeader,
  useGetUserSavedCollections,
  useGetMyAccountQuery,
  AspectRatio,
  Image,
} from "@UI";
import { mapArray } from "@UI/../utils/src";

export const SavedPostsSection: React.FC = () => {
  const { t } = useTranslation();

  const { data: account } = useGetMyAccountQuery();
  const { data } = useGetUserSavedCollections(
    { userId: account?.id! },
    { enabled: !!account?.id }
  );

  return (
    <SectionWrapper>
      <SectionHeader sectionTitle={t("Saved")}></SectionHeader>
      <div className="grid grid-cols-2 md:grid-cols-3">
        {mapArray(data, (collection, i) => (
          <div key={collection.id + i} className="flex fle-col gap-2">
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
            <p>{collection.name}</p>
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
