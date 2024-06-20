import { getCartSummaryData } from "api";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { SellerLayout, SpinnerFallback, CartSummaryItemsState } from "ui";
import { CartSummaryView } from "../components";

interface CartSummaryPageProps {}

export const getServerSideProps: GetServerSideProps<
  CartSummaryPageProps
> = async () => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery("CartSummaryData", getCartSummaryData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const CartSummary: NextPage<CartSummaryPageProps> = () => {
  const { data, isLoading, isError } = useQuery(
    "CartSummaryData",
    getCartSummaryData
  );
  const setItems = useSetRecoilState(CartSummaryItemsState);
  React.useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);
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
