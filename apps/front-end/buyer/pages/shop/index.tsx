import Head from "next/head";
import React from "react";
import { SellerLayout, ShopProductCardsView } from "ui";

interface SellerShopProps { }

const SellerShop: React.FC<SellerShopProps> = () => {
  return (
    <>
      <Head>
        <title>Wiaah | shop</title>
      </Head>
      <SellerLayout>
        <ShopProductCardsView products={FAKE_SHOP_PRODUCTS} />
      </SellerLayout>
    </>
  );
};

const FAKE_SHOP_PRODUCTS = [
  {
    name: "Product A",
    title: "Amazing Product A",
    image: "https://picsum.photos/200/200?random=1",
    price: 29.99,
    discount: 10,
    isLiked: true,
  },
  {
    name: "Product B",
    title: "Beautiful Product B",
    image: "https://picsum.photos/200/200?random=2",
    price: 49.99,
    discount: 15,
    isLiked: false,
  },
  {
    name: "Product C",
    title: "Cool Product C",
    image: "https://picsum.photos/200/200?random=3",
    price: 19.99,
    isLiked: true,
  },
  {
    name: "Product D",
    title: "Delightful Product D",
    image: "https://picsum.photos/200/200?random=4",
    price: 39.99,
    discount: 5,
    isLiked: false,
  },
  {
    name: "Product E",
    title: "Excellent Product E",
    image: "https://picsum.photos/200/200?random=5",
    price: 59.99,
    isLiked: true,
  },
  {
    name: "Product F",
    title: "Fabulous Product F",
    image: "https://picsum.photos/200/200?random=6",
    price: 24.99,
    discount: 20,
    isLiked: false,
  },
];

export default SellerShop;
