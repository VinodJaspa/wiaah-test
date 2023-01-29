import React from "react";
import { useTranslation } from "react-i18next";
import {
  SectionWrapper,
  SectionHeader,
  useGetMySavedPostsQuery,
  usePaginationControls,
  PostCardsListWrapper,
  ScrollPaginationWrapper,
} from "@UI";

export const SavedPostsSection: React.FC = () => {
  const { t } = useTranslation();
  const { pagination, controls } = usePaginationControls();
  const { data } = useGetMySavedPostsQuery({
    pagination,
  });
  return (
    <SectionWrapper>
      <SectionHeader sectionTitle={t("Saved")}></SectionHeader>
      <ScrollPaginationWrapper controls={controls}>
        <PostCardsListWrapper posts={data?.posts || []} />
      </ScrollPaginationWrapper>
      {!data || data.posts.length < 1 ? (
        <div className="text-black font-bold text-2xl text-center py-60">
          You Dont Have Any Saved Posts
        </div>
      ) : null}
    </SectionWrapper>
  );
};
