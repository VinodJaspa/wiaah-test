import {
  useGetSocialPostQuery,
  GetSocialPostQuery,
} from "@features/Social/services";
import React from "react";
import { useTranslation } from "react-i18next";

export const SocialAuthorSimillarPosts: React.FC<{
  postId: string;
  data: GetSocialPostQuery["getSocialPostById"];
}> = ({ postId, data }) => {
const { t } = useTranslation();

  //WARNING: This grqphql is not ready yet so  I replaced it with placeholder
  const { data: _data } = useGetSocialPostQuery({ id: postId });
  return (
    <div>
      <p className="text-center text-lg font-semibold">
        {`${t("View")} ${data?.publisher?.username} ${t("other posts")}`}
      </p>
    </div>
  );
};
