import Head from "next/head";
import React from "react";
import { ProductSearchCard, SellerLayout } from "ui";

interface SellerShopProps {}

const SellerShop: React.FC<SellerShopProps> = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Shop</title>
      </Head>
      <SellerLayout>
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
      </SellerLayout>
    </>
  );
};

export default SellerShop;
