import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { DiscoverView } from "ui";
import { SellerLayout } from "ui";
import { GetServerSideProps } from "next";
import { useResponsive } from "hooks";

interface DiscoverPageProps { }

const Discover: NextPage<DiscoverPageProps> = () => {
  const { isMobile } = useResponsive();
  return (
    <>
      <Head>
        <title>Wiaah | Discover</title>
      </Head>
      <SellerLayout
        showMobileHeader={true}
        header={`${isMobile ? "discover" : "main"}`}
      >
        <DiscoverView />
      </SellerLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}, // You can add your props here
  };
};

export default Discover;
