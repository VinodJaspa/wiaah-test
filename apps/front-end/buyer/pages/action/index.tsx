import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { ActionsView, SellerLayout } from "ui";

const ActionsPage: NextPage = () => {
  return (
    <>
      <Head>Wiaah | Buyer actions</Head>
      <SellerLayout>
        <ActionsView />
      </SellerLayout>
    </>
  );
};

export default ActionsPage;
