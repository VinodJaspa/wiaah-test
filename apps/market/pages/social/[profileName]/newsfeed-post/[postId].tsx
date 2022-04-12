import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useSetRecoilState } from "recoil";
import { PostCardInfo } from "types/market/Social";
import { Container, Collaboration } from "ui";
import { newsfeedPosts, PostCardPlaceHolder } from "ui/placeholder/social";
import {
  SocialNewsfeedPostsState,
  SocialNewsfeedPostState,
  SocialNewsfeedOtherPostsState,
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
        attachment: {
          src: "/shop-2.jpeg",
          type: "image",
        },
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
