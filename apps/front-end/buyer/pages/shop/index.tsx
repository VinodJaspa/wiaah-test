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
  {
    name: "Product G",
    title: "Great Product G",
    image: "https://picsum.photos/200/200?random=7",
    price: 34.99,
    discount: 12,
    isLiked: true,
  },
  {
    name: "Product H",
    title: "Handy Product H",
    image: "https://picsum.photos/200/200?random=8",
    price: 44.99,
    isLiked: false,
  },
  {
    name: "Product I",
    title: "Incredible Product I",
    image: "https://picsum.photos/200/200?random=9",
    price: 54.99,
    discount: 8,
    isLiked: true,
  },
  {
    name: "Product J",
    title: "Joyful Product J",
    image: "https://picsum.photos/200/200?random=10",
    price: 64.99,
    isLiked: false,
  },
  {
    name: "Product K",
    title: "Keen Product K",
    image: "https://picsum.photos/200/200?random=11",
    price: 74.99,
    discount: 18,
    isLiked: true,
  },
  {
    name: "Product L",
    title: "Lively Product L",
    image: "https://picsum.photos/200/200?random=12",
    price: 84.99,
    isLiked: false,
  },
  {
    name: "Product M",
    title: "Marvelous Product M",
    image: "https://picsum.photos/200/200?random=13",
    price: 94.99,
    discount: 22,
    isLiked: true,
  },
  {
    name: "Product N",
    title: "Nice Product N",
    image: "https://picsum.photos/200/200?random=14",
    price: 104.99,
    isLiked: false,
  },
  {
    name: "Product O",
    title: "Outstanding Product O",
    image: "https://picsum.photos/200/200?random=15",
    price: 114.99,
    discount: 25,
    isLiked: true,
  },
];
export default SellerShop;
