import React from "react";
import {
  SocialAuthorSimillarPosts,
  SocialPostAuthorHeader,
  SocialPostDetails,
} from "../components";
import { useGetSocialPostQuery } from "../services";
import { Divider } from "@partials";

export const SocialPostView: React.FC<{
  postId: string;
}> = ({ postId }) => {
  const { data } = useGetSocialPostQuery({ id: postId });
  console.log({ data });
  return (
    <div className="flex flex-col p-4 gap-2">
      {/* <LogoColouredIcon className="text-9xl self-center" /> */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {data?.userId ? <SocialPostAuthorHeader userId={data?.userId} /> : null}
      <Divider className="my-4" />
      {data?.id ? <SocialPostDetails postId={data.id} /> : null}
      {/* TODO: display simillar psots */}
      {data?.userId ? <SocialAuthorSimillarPosts postId={data.userId} /> : null}
    </div>
  );
};
