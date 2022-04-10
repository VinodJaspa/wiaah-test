import React from "react";
import { NextPage } from "next";
import {
  PostCard,
  PostCommentCard,
  SocialAffiliationCard,
  SocialHeader,
  SocialShopCard,
} from "ui";
import { Box } from "@chakra-ui/react";
import {
  PostCommentPlaceholder,
  socialAffiliationCardPlaceholder,
} from "ui/placeholder/social";
import {
  PostCardPlaceHolder,
  postProfilesPlaceholder,
} from "ui/placeholder/social";
import { ShopCardInfo } from "types/market/Social";
import { SocialAffiliationCardProps } from "ui/components/blocks/Social/SocialAffiliationCard";

const preview: NextPage = () => {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-slate-200">
      <Box w="25rem">
        {/* <SocialHeader /> */}
        {/* <PostCard
          showComments
          postInfo={PostCardPlaceHolder.postInfo}
          profileInfo={PostCardPlaceHolder.profileInfo}
        /> */}
        {/* <SocialShopCard showComments shopCardInfo={shopCardInfoPlaceholder} /> */}
        {/* <PostCommentCard {...PostCommentPlaceholder} /> */}
        <SocialAffiliationCard
          showComments
          {...socialAffiliationCardPlaceholder}
        />
      </Box>
    </section>
  );
};

export default preview;
