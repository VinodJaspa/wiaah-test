import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { ActionsView } from "../../components";
import { SellerLayout } from "ui";

const ActionPage: NextPage = () => {
  return (
    <>
      <Head>Wiaah | Seller actions</Head>
      <SellerLayout>
        <ActionsView />
      </SellerLayout>
    </>
  );
};

export default ActionPage;
