import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { SellerLayout } from "ui";
import { ShoppingManagementView } from "../../components/views/ShoppingManagement/ShoppingManagementView/index";

const ShoppingManagement: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Shopping management</title>
      </Head>
      <SellerLayout header={null}>
        <ShoppingManagementView />
      </SellerLayout>
    </>
  );
};

export default ShoppingManagement;
