import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { SellerLayout } from "ui";
import { ShoppingManagementView } from "../../components";

const ShoppingManagement: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Shopping management</title>
      </Head>
      <SellerLayout>
        <ShoppingManagementView />
      </SellerLayout>
    </>
  );
};

export default ShoppingManagement;
