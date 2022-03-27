import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useSetRecoilState } from "recoil";
import { CartSummaryItem } from "types/market/CartSummary";
import { Collaboration, Container, Divider, Spacer } from "ui";
import { CartSummaryItemsState } from "ui/state";
import CartSummaryView from "../components/CartSummary/CartSummaryView";
import MasterLayout from "../components/MasterLayout";
const items: CartSummaryItem[] = [
  {
    id: "1",
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
    sizes: [
      {
        size: "S",
      },
      {
        size: "M",
      },
      {
        size: "L",
      },
      {
        size: "XL",
      },
      {
        size: "XXL",
      },
      {
        size: "XXXL",
      },
    ],
    colors: [
      {
        name: "red",
        hexCode: "#900",
      },
      {
        name: "green",
        hexCode: "#090",
      },
      {
        name: "blue",
        hexCode: "#009",
      },
      {
        name: "black",
        hexCode: "#000",
      },
    ],
    type: "product",
  },
  {
    id: "2",
    imageUrl:
      "https://images.prismic.io/rushordertees-web/c46d32cd-469a-49a9-b175-7362171d29a7_Custom+Short+Sleeve+T-Shirt.jpg?auto=compress%2Cformat&rect=0%2C0%2C800%2C900&w=800&h=900",
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
    location: "123 main st apt 4 atlana ga",
    date: Date.now(),
    eventDuration: 20,
    eventAdresses: "test@adress.com",
  },
];
const cartSummary: NextPage = () => {
  const setItems = useSetRecoilState(CartSummaryItemsState);
  React.useEffect(() => {
    setItems(items);
  }, []);

  return (
    <>
      <Head>
        <title>Wiaah | Cart Summary</title>
      </Head>
      <MasterLayout>
        <div className="bg-gray-50">
          <Container>
            <CartSummaryView />
            <Spacer spaceInRem={2} />
            <Divider />
            <Collaboration />
          </Container>
        </div>
      </MasterLayout>
    </>
  );
};

export default cartSummary;
