import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useSetRecoilState } from "recoil";
import { PostCardInfo } from "types/market/Social";
import { Container, Collaboration, useStorySeenBy } from "ui";
import { newsfeedPosts, PostCardPlaceHolder } from "ui/placeholder/social";
import {
  SocialNewsfeedPostsState,
  SocialNewsfeedPostState,
  SocialNewsfeedOtherPostsState,
  SocialStoryState,
  SocialNewStoryState,
  SocialStoriesState,
} from "ui/state";
import MasterLayout from "../../../../components/MasterLayout";
import { PostView } from "../../../../components/Social/PostView";

interface SocialPageProps {
  newsfeedPost: PostCardInfo;
  otherPosts: PostCardInfo[];
}

export const getServerSideProps: GetServerSideProps<SocialPageProps> =
  async () => {
    // get post info
    const newsfeedPost: PostCardInfo = {
      ...newsfeedPosts[2],
      postInfo: {
        ...newsfeedPosts[2].postInfo,
        attachments: [
          {
            type: "image",
            src: "/verticalImage.jpg",
          },
          {
            src: "https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.webm",
            type: "video",
          },
          {
            src: "/shop.jpeg",
            type: "image",
          },
          {
            src: "/verticalVideo.mp4",
            type: "video",
          },
        ],
      },
    };
    const otherPosts: PostCardInfo[] = [...Array(3)].map(
      () => PostCardPlaceHolder
    );
    return {
      props: {
        newsfeedPost,
        otherPosts,
      },
    };
  };

const NewsfeedPost: NextPage<SocialPageProps> = ({
  newsfeedPost,
  otherPosts,
}) => {
  const setPost = useSetRecoilState(SocialNewsfeedPostState);
  const setOtherPosts = useSetRecoilState(SocialNewsfeedOtherPostsState);
  const setStory = useSetRecoilState(SocialStoryState);
  const setNewStory = useSetRecoilState(SocialNewStoryState);
  // const setStory = useSetRecoilState(SocialStoryState);
  const { setStorySeenBy } = useStorySeenBy();
  setStory({
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyType: "image",
    storyViews: 12300,
    storySrc: "/verticalImage.jpg",
    user: PostCardPlaceHolder.profileInfo,
    id: "1",
  });
  const setStories = useSetRecoilState(SocialStoriesState);
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
    ]);
  }, []);

  setNewStory(true);
  // console.log("post", newsfeedPost.profileInfo);
  setPost(newsfeedPost);

  setOtherPosts(newsfeedPosts);
  return (
    <>
      <Head>
        <title>Wiaah | newsfeed</title>
      </Head>
      <MasterLayout social>
        <Container>{newsfeedPost && <PostView />}</Container>
      </MasterLayout>
    </>
  );
};

export default NewsfeedPost;
