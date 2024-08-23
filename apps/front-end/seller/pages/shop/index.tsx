import Head from "next/head";
import React from "react";
import { SellerLayout, ShopProductCardsView } from "ui";
import { shopProductCardsPlaceholder } from "placeholder";

interface SellerShopProps { }

const SellerShop: React.FC<SellerShopProps> = () => {
  return (
    <>
      <Head>
        <title>Wiaah | shop</title>
      </Head>
      <SellerLayout>
        <ShopProductCardsView products={shopProductCardsPlaceholder} />
      </SellerLayout>
    </>
  );
};

export default SellerShop;
