import { getWishlistItemsData } from "api";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { QueryClient } from "react-query";
import { SellerLayout } from "ui";
import { WishlistView } from "../../components/index";

export interface WishListPageProps { }

export const getServerSideProps: GetServerSideProps<
  WishListPageProps
> = async () => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery("getWishlistItemsData", getWishlistItemsData);

  return {
    props: {},
  };
};

const wishlist: NextPage = () => {
  return (
    <>
      <Head>
        <title>Buyer | wishlist</title>
      </Head>
      <SellerLayout>
        <WishlistView />
      </SellerLayout>
    </>
  );
};

export default wishlist;
