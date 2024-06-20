import React from "react";
import { NextPage, GetServerSideProps } from "next";
import {
  shopCardInfoPlaceholder,
  ShopCardsInfoPlaceholder,
} from "ui/placeholder";
import { dehydrate, QueryClient } from "react-query";
import { ShopCardInfo } from "types";
import Head from "next/head";
import { SellerLayout } from "ui";
import { SellerShopPostView } from "../../../components";

interface ShopPostProps { }

async function getShopPosts(): Promise<ShopCardInfo[]> {
  return ShopCardsInfoPlaceholder;
}

async function getShopPost({ query }: any): Promise<ShopCardInfo> {
  return shopCardInfoPlaceholder;
}

export const getServerSideProps: GetServerSideProps<ShopPostProps> = async ({
  query,
}) => {
  const queryClient = new QueryClient();

  const postId = query.postId;

  queryClient.prefetchQuery(["shopPost", { postId }], getShopPost);
  queryClient.prefetchQuery("shopPosts", getShopPosts);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const ShopPost: NextPage<ShopPostProps> = () => {
  return (
    <>
      <Head>
        <title>Buyer | shop post</title>
      </Head>
      <SellerLayout>
        <SellerShopPostView />
      </SellerLayout>
    </>
  );
};

export default ShopPost;
