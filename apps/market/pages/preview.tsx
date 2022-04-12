import React from "react";
import { NextPage } from "next";
import {
  HashTagCard,
  PostCard,
  PostCommentCard,
  SocialAffiliationCard,
  SocialHeader,
  SocialShopCard,
} from "ui";
import { Box } from "@chakra-ui/react";
import {
  hashtagCardInfoPlaceholder,
  PostCommentPlaceholder,
  socialAffiliationCardPlaceholder,
} from "ui/placeholder/social";
import {
  PostCardPlaceHolder,
  postProfilesPlaceholder,
} from "ui/placeholder/social";
import { HashTagCardInfo, ShopCardInfo } from "types/market/Social";
import { SocialAffiliationCardProps } from "ui/components/blocks/Social/SocialAffiliationCard";
import { t } from "i18next";

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
        {/* <SocialAffiliationCard
          showComments
          {...socialAffiliationCardPlaceholder}
        /> */}
        <HashTagCard {...hashtagCardInfoPlaceholder} />
      </Box>
    </section>
  );
};

export default preview;
