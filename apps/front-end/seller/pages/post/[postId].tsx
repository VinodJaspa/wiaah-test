import { SocialPostView } from "@UI";
import { NewsFeedPostView, SellerLayout } from "@blocks";
import { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";

export default function PostDetailsView() {
  const router = useRouter();
  const postId = router.query.postId as string;
  return (
    <SellerLayout>
      <NewsFeedPostView postId={postId} />
    </SellerLayout>
  );
}
