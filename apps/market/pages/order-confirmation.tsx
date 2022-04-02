import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Container, Spacer, Collaboration } from "ui";
import MasterLayout from "../components/MasterLayout";
import OrderConfirmationView from "../components/OrderConfirmation/OrderConfirmationView";

const orderConfirmation: NextPage = () => {
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
