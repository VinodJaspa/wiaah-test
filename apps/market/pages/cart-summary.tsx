import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useSetRecoilState } from "recoil";
import { CartSummaryItemData } from "types/market/CartSummary";
import {
  CartSummaryProductsPH,
  Collaboration,
  Container,
  Divider,
  Spacer,
} from "ui";
import { CartSummaryItemsState } from "ui/state";
import CartSummaryView from "../components/CartSummary/CartSummaryView";
import MasterLayout from "../components/MasterLayout";

interface CartSummaryPageProps {
  Products: CartSummaryItemData[];
}

export const getServerSideProps: GetServerSideProps<CartSummaryPageProps> =
  async () => {
    const Products: CartSummaryItemData[] = CartSummaryProductsPH;
    return {
      props: { Products },
    };
  };
const cartSummary: NextPage<CartSummaryPageProps> = ({ Products }) => {
  return (
    <>
      <Head>
        <title>Wiaah | Cart Summary</title>
      </Head>
      <MasterLayout>
        <div className="bg-[#F3F3F3]">
          <Container>
            <CartSummaryView />
            <Spacer spaceInRem={4} />
          </Container>
        </div>
        <Container>
          <Collaboration />
        </Container>
      </MasterLayout>
    </>
  );
};

export default cartSummary;
