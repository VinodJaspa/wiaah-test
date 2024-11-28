import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Container, NewsFeedPostView } from "ui";
import { MasterLayout } from "@components";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { postId } = context.query;

  return {
    props: {
      postId: postId || null,
    },
  };
};

const NewsfeedPost: NextPage<{ postId: string }> = ({ postId }) => {
  return (
    <>
      <Head>
        <title>Wiaah | Newsfeed</title>
      </Head>
      <MasterLayout social>
        <Container>
          <NewsFeedPostView postId={postId} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default NewsfeedPost;
