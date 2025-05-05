import { NextPage } from "next";
import Head from "next/head";
import { CheckoutView, Container, SellerLayout } from "ui";
import React from "react";
const ServiceCheckout: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Checkout</title>
      </Head>
      <SellerLayout>
        <Container>
          <CheckoutView isSellerOrBuyer />
        </Container>
      </SellerLayout>
    </>
  );
};

export default ServiceCheckout;
