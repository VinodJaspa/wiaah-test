import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Container, HashtagPageView } from "ui";
import { MasterLayout } from "@components";

export interface HashTagPageProps { }

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tag } = context.query;

  return {
    props: {
      tag: tag || null,
    },
  };
};

const HashTag: NextPage<HashTagPageProps> = () => {
  return (
    <>
      <Head>
        <title>Wiaah | hashtag search results</title>
      </Head>
      <MasterLayout social>
        <Container>
          <HashtagPageView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default HashTag;
