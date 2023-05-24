import React from "react";
import { SocialPostAuthorHeader } from "../components";
import { useGetAffiliationPostQuery } from "../services";

export const AffiliationPostView: React.FC<{
  postId: string;
}> = ({ postId }) => {
  const { data } = useGetAffiliationPostQuery({ id: postId });
  return (
    <div className="flex flex-col gap-2">
      {data?.userId ? <SocialPostAuthorHeader userId={data?.userId} /> : null}
      {data?.userId ? <></> : null}
    </div>
  );
};
