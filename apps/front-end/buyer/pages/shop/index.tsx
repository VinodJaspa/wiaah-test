import Head from "next/head";
import React from "react";
import { SellerLayout } from "ui";
import { SellerShopView } from "../../components";

interface SellerShopProps { }

const SellerShop: React.FC<SellerShopProps> = () => {
  return (
    <>
      <Head>
        <title>Wiaah | shop</title>
      </Head>
      <SellerLayout>
        <SellerShopView />
      </SellerLayout>
    </>
  );
};

export default SellerShop;
