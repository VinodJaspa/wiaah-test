import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useSetRecoilState } from "recoil";
import { AffiliationOfferCardInfo } from "types/market/Social";
import { Container } from "ui";
import { socialAffiliationCardPlaceholders } from "ui/placeholder/social";
import {
  SocialAffiliationOffersState,
  SocialAffiliationOfferState,
} from "ui/state";
import MasterLayout from "../../../../components/MasterLayout";
import { AffiliationPostView } from "../../../../components/Social/AffiliationPostView";
import { ShopProductView } from "../../../../components/Social/ShopProductView";

interface AffiliationPostPageProps {
  affiliationPost: AffiliationOfferCardInfo;
  otherPosts: AffiliationOfferCardInfo[];
}

export const getServerSideProps: GetServerSideProps<AffiliationPostPageProps> =
  async () => {
    // get post info
    const affiliationPost: AffiliationOfferCardInfo =
      socialAffiliationCardPlaceholders[2];
    const otherPosts: AffiliationOfferCardInfo[] =
      socialAffiliationCardPlaceholders;
    return {
      props: {
        affiliationPost,
        otherPosts,
      },
    };
  };

const socialShopPost: NextPage<AffiliationPostPageProps> = ({
  affiliationPost,
  otherPosts,
}) => {
  const setPost = useSetRecoilState(SocialAffiliationOfferState);
  const setOtherPosts = useSetRecoilState(SocialAffiliationOffersState);

  // console.log("post", newsfeedPost.profileInfo);
  setPost(affiliationPost);
  setOtherPosts(otherPosts);

  return (
    <>
      <Head>
        <title>Wiaah | social affiliation post</title>
      </Head>
      <MasterLayout social>
        <Container>{affiliationPost && <AffiliationPostView />}</Container>
      </MasterLayout>
    </>
  );
};

export default socialShopPost;
