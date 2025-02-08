import { SellerLayout } from "@blocks";
import SocialNewsfeedView from "@features/Social/views/SocialNewsfeedView";
import { NextPage } from "next";
import Head from "next/head";

const NewsFeed: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Newsfeed</title>
      </Head>
      <SellerLayout header="main">
        <SocialNewsfeedView />
      </SellerLayout>
    </>
  );
};

export default NewsFeed;
