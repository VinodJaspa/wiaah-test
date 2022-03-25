import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Collaboration, Container, Divider, Spacer } from "ui";
import CartSummaryView from "../components/CartSummary/CartSummaryView";
import MasterLayout from "../components/MasterLayout";

const cartSummary: NextPage = () => {
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
