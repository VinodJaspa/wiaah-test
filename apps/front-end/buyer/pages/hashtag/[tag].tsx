import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { SellerLayout, useResponsive } from "ui";
import { dehydrate, QueryClient } from "react-query";
import { HashtagsView } from "../../components";

interface HashtagPageProps { }

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}, // You can add your props here
  };
};

const HashtagPage: NextPage<HashtagPageProps> = () => {
  const { isMobile } = useResponsive();
  return (
    <>
      <Head>
        <title>Buyer | hashtags</title>
      </Head>
      <SellerLayout header={isMobile ? "minimal" : "main"}>
        <HashtagsView />
      </SellerLayout>
    </>
  );
};

export default HashtagPage;
