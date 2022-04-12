import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Container } from "ui";
import MasterLayout from "../../../../components/MasterLayout";
import { HashTagView } from "../../../../components/Social/HashTagView";
import { hashTagCardsInfoPlaceholder } from "ui/placeholder/social";
import { HashTagCardInfo } from "types/market/Social";
import { useSetRecoilState } from "recoil";
import { SocialHashTagTopPosts } from "ui/state";

export interface HashTagPageProps {
  topPosts: HashTagCardInfo[];
}

export const getServerSideProps: GetServerSideProps<HashTagPageProps> = async ({
  query,
}) => {
  const tag = query.tag;
  // get posts by tag
  const topPosts = hashTagCardsInfoPlaceholder;

  return {
    props: {
      topPosts,
    },
  };
};

const hashTag: NextPage<HashTagPageProps> = ({ topPosts }) => {
  const setTopPosts = useSetRecoilState(SocialHashTagTopPosts);
  setTopPosts(topPosts);
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
