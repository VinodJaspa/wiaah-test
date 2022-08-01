import { MasterLayout, ServiceCheckoutView } from "@components";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Collaboration, Container } from "ui";

const ServiceCheckout: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Checkout</title>
      </Head>
      <MasterLayout>
        <div className="bg-[#F3F3F3]">
          <Container>
            <ServiceCheckoutView />
          </Container>
        </div>
        <Container>
          <Collaboration />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ServiceCheckout;
