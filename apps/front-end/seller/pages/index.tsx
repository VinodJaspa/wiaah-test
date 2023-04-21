import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { SellerLayout } from "ui";
import SocialNewsfeedView from "@features/Social/views/SocialNewsfeedView";

const Seller: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | seller</title>
      </Head>
      <SellerLayout header="main">
        <SocialNewsfeedView />
      </SellerLayout>
    </>
  );
};

export default Seller;
