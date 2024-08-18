import React from "react";
import { NextPage, GetServerSideProps } from "next";
import {
  shopCardInfoPlaceholder,
  ShopCardsInfoPlaceholder,
} from "ui/placeholder";
import { dehydrate, QueryClient } from "react-query";
import { ShopCardInfo } from "types";
import Head from "next/head";
import { SellerLayout, ShopCardsView } from "ui";
import { useRouter } from "next/router";
import ShopView from "../[id]";

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
  const router = useRouter();
  const postId = router.query.postId as string;
  return (
    <>
      <Head>
        <title>Seller | shop post</title>
      </Head>
      <SellerLayout>
        <ShopCardsView postId={postId} />
      </SellerLayout>
    </>
  );
};

export default ShopPost;
