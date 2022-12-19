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
      <PostCardsListWrapper
        posts={[...Array(5)].reduce((acc) => {
          return [...acc, ...newsfeedPosts];
        }, [])}
      />
    </SectionWrapper>
  );
};
