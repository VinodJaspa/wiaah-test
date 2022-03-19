import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import MasterLayout from "../../components/MasterLayout";
import { Container } from "ui";
import { ShopView } from "../../components/Shop/ShopView";
import { ProductProps } from "../../components/Services/ServiceRightView";

interface ShopProps {
  // implement types for service data when the api c
  shop: any;
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { shopid } = query;
  // get shop details by its id and return it to the page as props
  return {
    props: {},
  };
};
const shop = {
  shopDetails: "wiaah shop detials",
  shopLocation: "Switzerland, Geneva",
  shopName: "Wiaah",
  shopRating: 5,
  shopSince: new Date().toLocaleDateString(),
  shopThumbnailUrl: "/shop-2.jpeg",
};

const ServiceDetailPage: NextPage<ShopProps> = () => {
  // get product details from api
  return (
    <>
      <Head>
        <title>Wiaah | Shop</title>
      </Head>
      <MasterLayout>
        <ShopView shop={shop} products={products} />
      </MasterLayout>
    </>
  );
};

export default ServiceDetailPage;

const products: ProductProps[] = [
  {
    price: 15,
    imgUrl: "/shop-3.jpeg",
    name: "test item",
    rating: 3,
    cashBack: 12,
    off: 5,
    oldPrice: 20,
  },
  {
    name: "Camera Digital with extra lenses",
    imgUrl: "/shop-2.jpeg",
    price: 518.68,
    rating: 4,
    cashBack: 10,
    off: 10,
    oldPrice: 600,
  },
  {
    price: 15,
    imgUrl: "/shop-3.jpeg",
    name: "test item",
    rating: 3,
    cashBack: 12,
    off: 5,
    oldPrice: 20,
  },
  {
    name: "Camera Digital with extra lenses",
    imgUrl: "/shop-2.jpeg",
    price: 518.68,
    rating: 4,
    cashBack: 10,
    off: 10,
    oldPrice: 600,
  },
  {
    price: 15,
    imgUrl: "/shop-3.jpeg",
    name: "test item",
    rating: 3,
    cashBack: 12,
    off: 5,
    oldPrice: 20,
  },
  {
    name: "Camera Digital with extra lenses",
    imgUrl: "/shop-2.jpeg",
    price: 518.68,
    rating: 4,
    cashBack: 10,
    off: 10,
    oldPrice: 600,
  },
  {
    price: 15,
    imgUrl: "/shop-3.jpeg",
    name: "test item",
    rating: 3,
    cashBack: 12,
    off: 5,
    oldPrice: 20,
  },
  {
    name: "Camera Digital with extra lenses",
    imgUrl: "/shop-2.jpeg",
    price: 518.68,
    rating: 4,
    cashBack: 10,
    off: 10,
    oldPrice: 600,
  },
  {
    price: 15,
    imgUrl: "/shop-3.jpeg",
    name: "test item",
    rating: 3,
    cashBack: 12,
    off: 5,
    oldPrice: 20,
  },
  {
    name: "Camera Digital with extra lenses",
    imgUrl: "/shop-2.jpeg",
    price: 518.68,
    rating: 4,
    cashBack: 10,
    off: 10,
    oldPrice: 600,
  },
  {
    price: 15,
    imgUrl: "/shop-3.jpeg",
    name: "test item",
    rating: 3,
    cashBack: 12,
    off: 5,
    oldPrice: 20,
  },
  {
    name: "Camera Digital with extra lenses",
    imgUrl: "/shop-2.jpeg",
    price: 518.68,
    rating: 4,
    cashBack: 10,
    off: 10,
    oldPrice: 600,
  },
];
