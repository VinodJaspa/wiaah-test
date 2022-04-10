import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useSetRecoilState } from "recoil";
import { PostCardInfo } from "types/market/Social";
import { Container, Collaboration } from "ui";
import { PostCardPlaceHolder } from "ui/placeholder/social";
import {
  SocialNewsfeedPosts,
  SocialNewsfeedPost,
  SocialNewsfeedOtherPosts,
} from "ui/state";
import MasterLayout from "../../../../components/MasterLayout";
import { NewsFeedPostView } from "../../../../components/Social/NewsFeedPostView";

interface SocialPageProps {
  newsfeedPost: PostCardInfo;
  otherPosts: PostCardInfo[];
}

export const getServerSideProps: GetServerSideProps<SocialPageProps> =
  async () => {
    // get post info
    const newsfeedPost: PostCardInfo = PostCardPlaceHolder;
    const otherPosts: PostCardInfo[] = [...Array(10)].map(
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
  const setPost = useSetRecoilState(SocialNewsfeedPost);
  const setOtherPosts = useSetRecoilState(SocialNewsfeedOtherPosts);

  console.log("post", newsfeedPost.profileInfo);
  setPost(newsfeedPost);

  setOtherPosts(otherPosts);
  return (
    <>
      <Head>
        <title>Wiaah | newsfeed</title>
      </Head>
      <MasterLayout>
        <Container>
          {newsfeedPost && <NewsFeedPostView />}
          <Collaboration />
        </Container>
      </MasterLayout>
    </>
  );
};

export default NewsfeedPost;
