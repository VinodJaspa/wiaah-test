import React from "react";
import {
  SocialPostHeader,
  SocialAffiliationCard,
  Button,
  SocialProfileAffiliationPostsList,
  useGetAffiliationPostQuery,
} from "ui";
import { useTranslation } from "react-i18next";

export interface AffiliationPostViewProps {
  id: string;
}

export const AffiliationPostView: React.FC<AffiliationPostViewProps> = ({
  id,
}) => {
  const { t } = useTranslation();
  const { data: post } = useGetAffiliationPostQuery({ id });
  return (
    <div className="flex flex-col py-16 gap-8">
      <div className="flex flex-col md:flex-row gap-8 mb-24 items-start">
        <SocialPostHeader
          name={post?.user?.profile?.username}
          thumbnail={post?.user?.profile?.photo}
        />
        {post ? (
          <SocialAffiliationCard
            showComments
            post={{ ...post, user: { profile: post?.user?.profile! } }}
          />
        ) : null}
      </div>
      <p className="text-2xl font-bold w-full text-center capitalize">
        {t("view")} {post?.user?.profile?.username || "user"} {t("other posts")}
      </p>
      <SocialProfileAffiliationPostsList userId="" />
      <Button outline>{t("view_more", "view more")}</Button>
    </div>
  );
};
