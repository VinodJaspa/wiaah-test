import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { ImageSlider, Container } from "ui/components";
import { HomeView } from "ui/views";
import MasterLayout from "../components/MasterLayout";

const Market: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Market</title>
      </Head>
      <MasterLayout>
        <ImageSlider />
        <Container>
          <HomeView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default Market;
