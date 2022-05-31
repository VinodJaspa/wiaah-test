import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { dehydrate, QueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { CartSummaryItem } from "types";
import {
  CheckoutProductsState,
  SellerLayout,
  UserAddressesState,
  VoucherState,
} from "ui";
import { CheckoutView } from "../components";

interface CheckoutPageProps {}

export const getServerSideProps: GetServerSideProps<CheckoutPageProps> =
  async () => {
    const queryClient = new QueryClient();

    queryClient.prefetchQuery("CheckoutData");

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  };
const products: CartSummaryItem[] = [
  {
    id: "2",
    imageUrl:
      "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
    name: "item1",
    price: 15,
    qty: 3,
    shippingMotheds: [
      {
        deliveryTime: {
          from: 5,
          to: 7,
        },
        name: "European union",
        value: "european_union",
      },
      {
        deliveryTime: {
          from: 1,
          to: 3,
        },
        name: "Click & Collect",
        value: "click_and_collect",
      },
      {
        deliveryTime: {
          from: 6,
          to: 8,
        },
        name: "International",
        value: "international",
      },
    ],
    color: "relay blue/yellow",
    size: "One Size",
    type: "product",
    cashback: {
      unit: "%",
      value: 10,
    },
    discount: {
      unit: "$",
      value: 5,
    },
    oldPrice: 20,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloremque molestiae perferendis saepe? Tenetur, eligendi. Excepturi voluptate harum fuga! Consequatur?`,
  },
  {
    id: "3",
    imageUrl:
      "https://static.barcelo.com/content/dam/bhg/master/es/hoteles/guatemala/guatemala-city/barcelo-guatemala-city/carrusel/BGUA_VIEW_01.jpg.bhgimg.optm1100.jpg/1604614790315.jpg",
    name: "item1",
    price: 15,
    qty: 3,
    shippingMotheds: [
      {
        deliveryTime: {
          from: 5,
          to: 7,
        },
        name: "European union",
        value: "european_union",
      },
      {
        deliveryTime: {
          from: 1,
          to: 3,
        },
        name: "Click & Collect",
        value: "click_and_collect",
      },
      {
        deliveryTime: {
          from: 6,
          to: 8,
        },
        name: "International",
        value: "international",
      },
    ],
    type: "service",
    location: "123 main st apt 4 ",
    date: Date.now(),
    eventDuration: 20,
    eventAdresses: "test@adress.com",
    cashback: {
      unit: "%",
      value: 10,
    },
    discount: {
      unit: "$",
      value: 5,
    },
    oldPrice: 20,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloremque molestiae perferendis saepe? Tenetur, eligendi. Excepturi voluptate harum fuga! Consequatur?`,
  },
];
const checkout: NextPage<CheckoutPageProps> = () => {
  // const setVoucher = useSetRecoilState(VoucherState);
  const setProducts = useSetRecoilState(CheckoutProductsState);
  useEffect(() => {
    setProducts(products);
    // setVoucher(cart.voucher);
  }, []);

  return (
    <>
      <Head>
        <title>seller | Checkout</title>
      </Head>
      <SellerLayout sideBar={false}>
        <CheckoutView />
      </SellerLayout>
    </>
  );
};

export default checkout;
