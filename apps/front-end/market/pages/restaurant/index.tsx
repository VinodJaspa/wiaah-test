import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Container } from "ui";
import { MasterLayout } from "@components";
import HotelsPageMarket from "@features/Services/components/Hotel";
import VehiclePage from "@features/Services/components/Vehicle";
import RestaurantsPage from "@features/Services/components/Restaurant";

const HotelSection: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Restaurant</title>
      </Head>
      <MasterLayout >
        <Container>
          <RestaurantsPage />
        </Container>
      </MasterLayout>
    </>
  );
};

export default HotelSection;
