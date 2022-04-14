import React from "react";
import { NextPage } from "next";
import { SocialAuthFooter } from "ui";
import { Box } from "@chakra-ui/react";

const preview: NextPage = () => {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-slate-200">
      <Box w="100%">
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
        {/* <HashTagCard {...hashtagCardInfoPlaceholder} /> */}
        <SocialAuthFooter />
      </Box>
    </section>
  );
};

export default preview;
