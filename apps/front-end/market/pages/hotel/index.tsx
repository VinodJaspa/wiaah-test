import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Container } from "ui";
import { MasterLayout } from "@components";
import HotelsPageMarket from "@features/Services/components/Hotel";

const HotelSection: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Hotel</title>
      </Head>
      <MasterLayout >
        <Container>
          <HotelsPageMarket />
        </Container>
      </MasterLayout>
    </>
  );
};

export default HotelSection;
