import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { DiscoverView } from "ui";
import { SellerLayout } from "ui";
import { useResponsive } from "hooks";

interface DiscoverPageProps {}

const Discover: NextPage<DiscoverPageProps> = () => {
  const { isMobile } = useResponsive();
  return (
    <>
      <Head>
        <title>Wiaah | Discover</title>
      </Head>
      <SellerLayout>
        <DiscoverView />
      </SellerLayout>
    </>
  );
};

export default Discover;
