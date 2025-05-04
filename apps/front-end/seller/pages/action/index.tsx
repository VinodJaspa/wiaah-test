import { NextPage } from "next";
import Head from "next/head";
import { ActionsView, SellerLayout } from "ui";
import React from "react";
const ActionsPage: NextPage = () => {
  return (
    <>
      <Head>Wiaah | Seller actions</Head>
      <SellerLayout>
        <ActionsView />
      </SellerLayout>
    </>
  );
};

export default ActionsPage;
