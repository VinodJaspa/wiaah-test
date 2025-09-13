import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { SellerLayout } from "ui";
import SocialNewsfeedView from "@features/Social/views/SocialNewsfeedView";

const Seller: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Buyer</title>
      </Head>
      <SellerLayout header="main" accountType="buyer">
        <SocialNewsfeedView isHome/>
      </SellerLayout>
    </>
  );
};

export default Seller;
