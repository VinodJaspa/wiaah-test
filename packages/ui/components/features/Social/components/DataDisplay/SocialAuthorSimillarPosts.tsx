import { useGetSocialPostQuery } from "@features/Social/services";
import React from "react";
import { useTranslation } from "react-i18next";

export const SocialAuthorSimillarPosts: React.FC<{
  postId: string;
}> = ({ postId }) => {
  const { t } = useTranslation();

  const { data } = useGetSocialPostQuery({ id: postId });
  return (
    <div>
      <p className="text-center text-lg font-semibold">
        {`${t("View")} ${data?.publisher?.username} ${t("other posts")}`}
      </p>
    </div>
  );
};
