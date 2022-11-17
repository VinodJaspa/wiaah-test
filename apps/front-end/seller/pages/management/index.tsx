import { ManagementView } from "@components";
import Head from "next/head";
import React from "react";
import { SellerLayout } from "ui";

const ManagementPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Shopping management</title>
      </Head>
      <SellerLayout>
        <ManagementView />
      </SellerLayout>
    </>
  );
};

export default ManagementPage;
