import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Container, HealthCenterDetailsView } from "ui";
import { MasterLayout } from "@components";
import HotelsPageMarket from "@features/Services/components/Hotel";
import DoctorsPage from "@features/Services/components/HealthCenter";

const HotelSection: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Health</title>
      </Head>
      <MasterLayout >
        <Container>
          <DoctorsPage />
        </Container>
      </MasterLayout>
    </>
  );
};

export default HotelSection;
