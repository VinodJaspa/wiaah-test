import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { SellerLayout } from "ui";
import { ShopManagementView } from "@components";
import { useRouter } from "next/router";

interface shopManagementPageProps {}

export const getServerSideProps: GetServerSideProps<
  shopManagementPageProps
> = async () => {
  return {
    props: {},
  };
};

const shopManagement: NextPage = () => {
  const router = useRouter();
  const { section } = router.query;

  return (
    <>
      <Head>
        <title>wiaah | shop management</title>
      </Head>
      <SellerLayout>
        <ShopManagementView  />
      </SellerLayout>
    </>
  );
};

export default shopManagement;
