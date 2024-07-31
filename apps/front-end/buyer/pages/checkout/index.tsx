import { NextPage } from "next";
import { CheckoutView } from "ui";
import Head from "next/head";
import React from "react";
import { Collaboration, Container, SellerLayout } from "ui";
import { GetServerSideProps } from "next";

const ServiceCheckout: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Checkout</title>
      </Head>
      <SellerLayout>
        <div className="bg-[#F3F3F3]">
          <Container>
            <CheckoutView />
          </Container>
        </div>
        <Container>
          <Collaboration />
        </Container>
      </SellerLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}, // You can add your props here
  };
};
export default ServiceCheckout;
