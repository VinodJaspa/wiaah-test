import Head from "next/head";
import { shopProductCardsPlaceholder } from "placeholder";
import React from "react";
import { SellerLayout, ShopProductCardsView, ShopProductSearchForm } from "ui";

interface SellerShopProps {}

const SellerShop: React.FC<SellerShopProps> = () => {
  return (
    <>
      <Head>
        <title>Wiaah | shop</title>
      </Head>
      <SellerLayout>
        <div className="flex flex-col gap-[54px]">
          <div className="flex flex-col gap-[28px]">
            <ShopProductSearchForm />
            <div>ShopPoductFilterForm</div>
          </div>
          <ShopProductCardsView products={shopProductCardsPlaceholder} />
        </div>
      </SellerLayout>
    </>
  );
};

export default SellerShop;
