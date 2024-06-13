import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { QueryClient, dehydrate } from "react-query";
import { PostCardInfo } from "types";
import { PostCardPlaceHolder, newsfeedPosts } from "ui/placeholder";
import Head from "next/head";
import { SellerLayout } from "ui";
import { NewsFeedPostView } from "../../../components";
import { useRouting } from "routing";

interface NewsFeedPost { }

async function getPost({ queryKey }: any): Promise<PostCardInfo> {
  const postId = queryKey[1].postId;

  return PostCardPlaceHolder;
}

async function getPosts(): Promise<PostCardInfo[]> {
  return newsfeedPosts;
}

export const getServerSideProps: GetServerSideProps<NewsFeedPost> = async ({
  query,
}) => {
  const queryClient = new QueryClient();

  const postId = query.postId;

  queryClient.prefetchQuery(["newsFeedPost", { postId }], getPost);
  queryClient.prefetchQuery("newsFeedOtherPosts", getPosts);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const NewsFeedPost: NextPage<NewsFeedPost> = () => {
  const { getParam } = useRouting();
  const postId = getParam("postId");
  return (
    <>
      <Head>
        <title>Seller | NewsFeed Post</title>
      </Head>
      <SellerLayout>
        <NewsFeedPostView postId={postId} />
      </SellerLayout>
    </>
  );
};

export default NewsFeedPost;
