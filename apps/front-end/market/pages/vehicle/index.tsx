import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Container } from "ui";
import { MasterLayout } from "@components";
import HotelsPageMarket from "@features/Services/components/Hotel";
import VehiclePage from "@features/Services/components/Vehicle";

const HotelSection: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Vehicle</title>
      </Head>
      <MasterLayout >
        <Container>
          <VehiclePage />
        </Container>
      </MasterLayout>
    </>
  );
};

export default HotelSection;
