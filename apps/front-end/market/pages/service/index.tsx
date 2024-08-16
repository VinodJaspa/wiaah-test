import Head from "next/head";
import React from "react";
import {
  SellerLayout,
  ShopCardsListWrapper,
  SocialShopsPostCardPlaceholder,
} from "ui";

interface MarketServicesProps { }

const MarketServices: React.FC<MarketServicesProps> = () => {
  return (
    <>
      <Head>
        <title>Wiaah | shop</title>
      </Head>
      <SellerLayout>
        <div className="flex justify-center w-full h-fit">
          <div className="md:w-8/12 w-11/12">
            <ShopCardsListWrapper
              cols={3}
              items={SocialShopsPostCardPlaceholder}
              popup={false}
            />
          </div>
        </div>
      </SellerLayout>
    </>
  );
};

export default MarketServices;
