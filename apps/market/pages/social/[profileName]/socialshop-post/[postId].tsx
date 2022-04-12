import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useSetRecoilState } from "recoil";
import { ShopCardInfo } from "types/market/Social";
import { Container } from "ui";
import {
  shopCardInfoPlaceholder,
  ShopCardsInfoPlaceholder,
} from "ui/placeholder/social";
import { SocialShopPostState, SocialShopOtherPostsState } from "ui/state";
import MasterLayout from "../../../../components/MasterLayout";
import { ShopProductView } from "../../../../components/Social/ShopProductView";

interface SocialShopPostPageProps {
  shopProductPost: ShopCardInfo;
  otherPosts: ShopCardInfo[];
}

export const getServerSideProps: GetServerSideProps<SocialShopPostPageProps> =
  async () => {
    // get post info
    const shopProductPost: ShopCardInfo = ShopCardsInfoPlaceholder[2];
    const otherPosts: ShopCardInfo[] = ShopCardsInfoPlaceholder;
    return {
      props: {
        shopProductPost,
        otherPosts,
      },
    };
  };

const socialShopPost: NextPage<SocialShopPostPageProps> = ({
  shopProductPost,
  otherPosts,
}) => {
  const setPost = useSetRecoilState(SocialShopPostState);
  const setOtherPosts = useSetRecoilState(SocialShopOtherPostsState);

  // console.log("post", newsfeedPost.profileInfo);
  setPost(shopProductPost);

  setOtherPosts(otherPosts);
  return (
    <>
      <Head>
        <title>Wiaah | social shop post</title>
      </Head>
      <MasterLayout social>
        <Container>{shopProductPost && <ShopProductView />}</Container>
      </MasterLayout>
    </>
  );
};

export default socialShopPost;
