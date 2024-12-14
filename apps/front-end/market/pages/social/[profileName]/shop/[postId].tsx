import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useSetRecoilState } from "recoil";
import { ShopCardInfo } from "types";
import { Container, useStory, useStorySeenBy } from "ui";
import { shopCardInfoPlaceholder, ShopCardsInfoPlaceholder } from "placeholder";
import {
  SocialShopPostState,
  SocialShopOtherPostsState,
  SocialStoriesState,
  SocialStoryState,
} from "@src/state";
import { PostCardPlaceHolder } from "placeholder";
import { MasterLayout, ShopDetailsView } from "@components";
import { ShopProductView } from "@components";

const SocialShopPost: NextPage = ({ }) => {
  const shopProductPost: ShopCardInfo = shopCardInfoPlaceholder;
  const otherPosts: ShopCardInfo[] = ShopCardsInfoPlaceholder;
  const setPost = useSetRecoilState(SocialShopPostState);
  const setOtherPosts = useSetRecoilState(SocialShopOtherPostsState);

  const setStory = useSetRecoilState(SocialStoryState);
  const { setStorySeenBy } = useStorySeenBy();
  const { isNewStory } = useStory();
  const setStories = useSetRecoilState(SocialStoriesState);
  React.useEffect(() => {
    setStories([
      {
        storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
        storyType: "text",
        storyViews: 1500,
        storyText: "hello, my first story",
        id: "1",
      },
      {
        storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
        storyType: "image",
        storyViews: 1900,
        storySrc: "/shop-2.jpeg",
        id: "2",
        storyText: "image story with text",
      },
      {
        storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
        storyType: "image",
        storyViews: 12300,
        storySrc: "/verticalImage.jpg",
        id: "3",
      },
      {
        storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
        storyType: "video",
        storyViews: 500,
        storySrc: "/video.mp4",
        storyText: "video story with Text",
        id: "4",
      },
      {
        storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
        storyType: "video",
        storyViews: 1300000,
        storySrc: "/verticalVideo.mp4",
        id: "5",
      },
    ]);

    setStorySeenBy([
      {
        name: "wiaah",
        photoSrc: "/wiaah_logo.png",
      },
      {
        name: "seller",
        photoSrc: "/shop.jpeg",
      },
      {
        name: "buyer",
        photoSrc: "/shop-2.png",
      },
      {
        name: "wiaah",
        photoSrc: "/wiaah_logo.png",
      },
    ]);
    isNewStory();
  }, [isNewStory, setStories, setStorySeenBy]);
  setStory({
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyType: "text",
    storyViews: 12300,
    storyText: "Hello, this is my first story",
    storySrc: "/verticalVideo.mp4",
    user: PostCardPlaceHolder.profileInfo,
    id: "15",
  });
  // console.log("post", newsfeedPost.profileInfo);
  setPost(shopProductPost);

  setOtherPosts(otherPosts);
  return (
    <>
      <Head>
        <title>Wiaah | social shop post</title>
      </Head>
      <MasterLayout social>
        <ShopDetailsView id={"4"} />
      </MasterLayout>
    </>
  );
};

export default SocialShopPost;
