import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import MasterLayout from "../../components/MasterLayout";
import { ShopView } from "../../components/Shop/ShopView";
import { products } from "ui/placeholder/products";
import { Shop } from "../../components/Shop/ShopProfile";
import { reviews } from "ui/placeholder/reviews";
import { Container } from "ui";
import { Collaboration } from "ui/components/blocks/Collaboration";
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
const shop: Shop = {
  shopDetails: "wiaah shop detials",
  shopLocation: {
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/512px-Flag_of_Switzerland.svg.png",
    location: "Switzerland, Geneva",
  },
  verified: true,
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
        <ShopView reviews={reviews} shop={shop} products={products} />
        <Container>
          <Collaboration />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ServiceDetailPage;
