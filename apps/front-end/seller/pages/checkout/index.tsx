import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Collaboration, Container, SellerLayout } from "ui";
import { CheckoutView } from "ui";

const ServiceCheckout: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Checkout</title>
      </Head>
      <SellerLayout containerProps={{ className: "bg-[#F3F3F3]" }}>
        <div className="bg-[#F3F3F3]">
          <Container>
            <CheckoutView />
          </Container>
        </div>
      </SellerLayout>
    </>
  );
};

export default ServiceCheckout;
