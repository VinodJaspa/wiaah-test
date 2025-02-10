import Head from "next/head";
import React from "react";
import { ProductSearchCard, SellerLayout, ShopProductSearchForm } from "ui";
import { ShopProductFilterView } from "ui/components/blocks/ShopProductFilterView";

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
            <ShopProductFilterView />
          </div>
          <div className="grid gap-12 grid-cols-4">
            {[...Array(12)]
              .map((_, i) => ({
                productInfo: {
                  cashback: 5,
                  colors: [
                    "#4272EE",
                    "#3CD399",
                    "#F93030",
                    "#000000",
                    "#FFC700",
                    "#fff",
                  ],
                  price: 50,
                  discount: 15,
                  rating: 4.8,
                  reviewsCount: 150,
                  thumbnail:
                    "https://nextluxury.com/wp-content/uploads/Scarves-Fashion-Accessories-For-Men.jpg",
                  title: "Product title",
                },
                sellerInfo: {
                  name: "Seller name",
                  profession: "Profession",
                  thumbnail: "/profile (1).jfif",
                  verified: true,
                },
              }))
              .map((prod, i) => (
                <ProductSearchCard key={i} {...prod} />
              ))}
          </div>
        </div>
      </SellerLayout>
    </>
  );
};

export default SellerShop;
