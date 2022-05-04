import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useSetRecoilState } from "recoil";
import { PostCardInfo, ProfileInfo } from "types/market/Social";
import { Container, Collaboration, useStorySeenBy } from "ui";
import {
  SocialProfileInfo,
  PostCardPlaceHolder,
  postProfilesPlaceholder,
} from "ui/placeholder/social";
import {
  SocialNewsfeedPostsState,
  SocialProfileInfoState,
  SocialNewStoryState,
  SocialStoriesState,
} from "ui/state";
import MasterLayout from "../../../components/MasterLayout";
import SocialView from "../../../components/Social/SocialView";
import { products } from "ui/placeholder/products";
import { newsfeedPosts as NewsFeedPostsPlaceholder } from "ui/placeholder/social";
import { SocialStoryState } from "ui/state/Recoil";

interface SocialPageProps {
  profile: ProfileInfo;
  newsfeedPosts: PostCardInfo[];
}

const images: string[] = [...products.map((pro) => pro.imgUrl)];
const getRandomUser = () =>
  postProfilesPlaceholder[
    Math.floor(Math.random() * postProfilesPlaceholder.length)
  ];
export const getServerSideProps: GetServerSideProps<SocialPageProps> =
  async () => {
    // get user/shop profle info

    return {
      props: {
        profile: SocialProfileInfo,
        newsfeedPosts: NewsFeedPostsPlaceholder,
      },
    };
  };

const ShopSocialProfile: NextPage<SocialPageProps> = ({
  newsfeedPosts,
  profile,
}) => {
  const setprofile = useSetRecoilState(SocialProfileInfoState);
  const setFeedPosts = useSetRecoilState(SocialNewsfeedPostsState);
  const setNewStory = useSetRecoilState(SocialNewStoryState);
  const setStory = useSetRecoilState(SocialStoryState);
  const setStories = useSetRecoilState(SocialStoriesState);
  const { setStorySeenBy } = useStorySeenBy();
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

  setStory({
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyType: "text",
    storyViews: 12300,
    storyText: "Hello, this is my first story",
    storySrc: "/verticalVideo.mp4",
    user: PostCardPlaceHolder.profileInfo,
    id: "15",
  });
  React.useEffect(() => {
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
  }, []);
  setNewStory(true);

  setprofile(profile);

  setFeedPosts(newsfeedPosts);

  return (
    <>
      <Head>
        <title>Wiaah | Social</title>
      </Head>
      <MasterLayout social>
        <SocialView />
      </MasterLayout>
      {/* <div className="h-8" /> */}
    </>
  );
};

export default ShopSocialProfile;
