import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Container } from "ui";
import { MasterLayout } from "@components";
import { HashTagView } from "@components";
import { hashTagCardsInfoPlaceholder } from "placeholder";
import { HashTagCardInfo } from "types";
import { useSetRecoilState } from "recoil";
import { SocialHashTagTopPosts } from "ui/state";

export interface HashTagPageProps {
  topPosts: HashTagCardInfo[];
}

// export const getServerSideProps: GetServerSideProps<HashTagPageProps> = async ({
//   query,
// }) => {
//   const tag = query.tag;
//   // get posts by tag
// };

const hashTag: NextPage<HashTagPageProps> = ({ topPosts }) => {
  const setTopPosts = useSetRecoilState(SocialHashTagTopPosts);
  setTopPosts(hashTagCardsInfoPlaceholder);
  return (
    <>
      <Head>
        <title>Wiaah | hashtag search results</title>
      </Head>
      <MasterLayout social>
        <Container>
          <HashTagView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default hashTag;
