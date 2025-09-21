import { getCartSummaryData } from "api";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { SellerLayout, SpinnerFallback, CartSummaryItemsState, CartSummaryView } from "ui";


interface CartSummaryPageProps { }

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}, // You can add your props here
  };
};

const CartSummary: NextPage<CartSummaryPageProps> = () => {
  return (
    <>
      <Head>
        <title>Buyer | Cart Summary</title>
      </Head>
      <SellerLayout sideBar={false}>
        <SpinnerFallback isLoading={false}>
          <CartSummaryView />
        </SpinnerFallback>
      </SellerLayout>
    </>
  );
};

export default CartSummary;
