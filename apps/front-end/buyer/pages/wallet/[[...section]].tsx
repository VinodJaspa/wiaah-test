import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { SellerLayout } from "ui";
import { WalletView } from "../../components/views/Wallet";

const Wallet: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | wallet</title>
      </Head>
      <SellerLayout header={null}>
        <WalletView />
      </SellerLayout>
    </>
  );
};

export default Wallet;
