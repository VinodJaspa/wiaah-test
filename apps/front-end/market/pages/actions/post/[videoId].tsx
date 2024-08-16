import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { SellerLayout, ActionPostView } from "ui";
import { useRouter } from "next/router";

const ActionPage: NextPage = () => {
  const router = useRouter();
  const videoId = router.query.videoId as string;
  return (
    <>
      <Head>Wiaah | Market Actions</Head>
      <SellerLayout>
        <ActionPostView videoId={videoId} />
      </SellerLayout>
    </>
  );
};

export default ActionPage;
