import React from "react";
import { useTranslation } from "react-i18next";
import {
  SectionWrapper,
  SectionHeader,
  PostCardsListWrapper,
  newsfeedPosts,
} from "@UI";

export const SavedPostsSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <SectionWrapper>
      <SectionHeader sectionTitle={t("Saved")}></SectionHeader>
      {/* <PostCardsListWrapper
        posts={[...Array(5)].reduce((acc) => {
          return [...acc, ...newsfeedPosts];
        }, [])}
      /> */}
      <div className="text-black font-bold text-2xl text-center py-60">
        You Dont Have Any Saved Posts
      </div>
    </SectionWrapper>
  );
};
