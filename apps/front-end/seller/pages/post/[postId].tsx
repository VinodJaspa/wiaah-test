import { SocialPostView } from "@UI";
import { SellerLayout } from "@blocks";
import { NextPage } from "next";
import React from "react";
import { useRouting } from "routing";

const PostDetailsView: NextPage = () => {
  const { getParam } = useRouting();

  const postId = getParam("postId");
  console.log("postId", postId);
  return (
    <SellerLayout>
      <SocialPostView postId={postId} />
    </SellerLayout>
  );
};

export default PostDetailsView;
