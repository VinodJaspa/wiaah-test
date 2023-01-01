import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useSetRecoilState } from "recoil";
import { CartSummaryItemData } from "types";
import { Container, Spacer, Collaboration } from "ui";
import { ProductsWithProfile } from "ui/placeholder";
import { CartSummaryItemsState, VoucherState } from "@src/state";
import MasterLayout from "../components/MasterLayout";
import OrderConfirmationView from "../components/OrderConfirmation/OrderConfirmationView";
interface OrderConfirmationPageProps {
  Products: CartSummaryItemData[];
}

export const getServerSideProps: GetServerSideProps<
  OrderConfirmationPageProps
> = async () => {
  const Products: CartSummaryItemData[] = ProductsWithProfile;

  return {
    props: { Products },
  };
};

const orderConfirmation: NextPage<OrderConfirmationPageProps> = ({
  Products,
}) => {
  const setItems = useSetRecoilState(CartSummaryItemsState);
  const setVoucher = useSetRecoilState(VoucherState);
  React.useEffect(() => {
    setItems(Products);
    setVoucher({
      unit: "%",
      value: 50,
      voucherName: "50OFF",
    });
  }, []);
  return (
    <>
      <Head>
        <title>Confirm Order</title>
      </Head>
      <MasterLayout>
        <div className="bg-[#F3F3F3]">
          <Container>
            <OrderConfirmationView />
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

export default orderConfirmation;
