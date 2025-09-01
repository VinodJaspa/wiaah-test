import { faker } from "@faker-js/faker";
import Head from "next/head";
import React from "react";
import { ProductSearchCard, SellerLayout } from "ui";

interface SellerShopProps {}

const SellerShop: React.FC<SellerShopProps> = () => {
  const products = [...Array(12)].map((_, i) => ({
    productInfo: {
      cashback: 5,
      colors: ["#4272EE", "#3CD399", "#F93030", "#000000", "#FFC700", "#fff"],
      price: 50 + i * 5,
      originalPrice: 60 + i * 5,
      discount: 15,
      rating: Number((4.5 + (i % 5) * 0.1).toFixed(1)), // keep number, not string
      reviewsCount: 100 + i * 10,
      sizes: ["S", "M", "L"],
      thumbnail: `https://picsum.photos/300/400?random=${i}`, // random product image
      title: `${faker.name.firstName()} ${faker.name.lastName()}`,
    },
    sellerInfo: {
      name: `Seller ${i + 1}`,
      profession: "Fashion Designer",
      thumbnail: `https://i.pravatar.cc/100?img=${i + 10}`, // random seller avatar
      verified: i % 2 === 0, // alternate verification
    },
  }));

  return (
    <>
      <Head>
        <title>Wiaah | Shop</title>
      </Head>
      <SellerLayout>
        <div className="grid gap-12 grid-cols-4">
          {products.map((prod, i) => (
            <ProductSearchCard key={i} {...prod} />
          ))}
        </div>
      </SellerLayout>
    </>
  );
};

export default SellerShop;
