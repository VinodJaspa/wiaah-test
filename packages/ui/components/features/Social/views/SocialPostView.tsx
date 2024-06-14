import React, { useMemo } from "react";
import {
  SocialAuthorSimillarPosts,
  SocialPostAuthorHeader,
  SocialPostDetails,
} from "../components";
import { useGetSocialPostQuery } from "../services";
import { Divider } from "@partials";
import { getRandomImage } from "placeholder";
import { PostType } from "@features/API";

const FAKE_SOCIAL_POST_DATA = {
  type: PostType.NewsfeedPost,
  createdAt: "2024-06-14T10:00:00Z",
  views: 1500,
  reactionNum: 200,
  comments: 50,
  shares: 30,
  userId: "user123",
  id: "post456",
  productIds: ["product789", "product101"],
  isLiked: true,
  isCommented: false,
  isSaved: true,
  publisher: {
    photo: getRandomImage(),
    username: "john_doe",
    id: "profile123",
    ownerId: "owner456",
    verified: true,
  },
};

export const SocialPostView: React.FC<{
  postId: string;
}> = ({ postId }) => {
  const { data: _data } = useGetSocialPostQuery({ id: postId });
  const data = useMemo(() => FAKE_SOCIAL_POST_DATA, []);
  return (
    <div className="flex flex-col p-4 gap-2">
      {/* <LogoColouredIcon className="text-9xl self-center" /> */}
      {data?.userId ? <SocialPostAuthorHeader userId={data?.userId} /> : null}
      <Divider className="my-4" />
      {data?.id ? <SocialPostDetails postId={data.id} data={data} /> : null}
      {/* TODO: display simillar psots */}
      {data?.userId ? (
        <SocialAuthorSimillarPosts postId={data.userId} data={data} />
      ) : null}
    </div>
  );
};
