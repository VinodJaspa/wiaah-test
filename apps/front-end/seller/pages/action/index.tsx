import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { SellerLayout } from "ui";
import { ActionsView } from "@components";

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
