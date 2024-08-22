import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { DiscoverView } from "ui";
import { SellerLayout } from "ui";

interface DiscoverPageProps { }

const discover: NextPage<DiscoverPageProps> = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Discover</title>
      </Head>
      <SellerLayout header="discover">
        <DiscoverView />
      </SellerLayout>
    </>
  );
};

export default discover;
