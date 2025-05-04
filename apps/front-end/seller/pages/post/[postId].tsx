import { NewsFeedPostView, SellerLayout } from "@blocks";
import { useRouter } from "next/router";
import React from "react";
export default function PostDetailsView() {
  const router = useRouter();
  const postId = router.query.postId as string;
  return (
    <SellerLayout>
      <NewsFeedPostView postId={postId} />
    </SellerLayout>
  );
}
