import { SocialPostView } from "@UI";
import { SellerLayout } from "@blocks";
import { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";

export default function PostDetailsView() {
  const router = useRouter();
  const { postId } = router.query;
  return (
    <SellerLayout>
      <SocialPostView postId="44" />
    </SellerLayout>
  );
}
