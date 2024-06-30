import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { DiscoverView } from "../../components";
import { SellerLayout } from "ui";
import { GetServerSideProps } from "next";

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

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}, // You can add your props here
  };
};

export default discover;
