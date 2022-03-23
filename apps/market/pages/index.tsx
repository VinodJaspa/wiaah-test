import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { ImageSlider, Container, CookiesInfoBanner } from "ui/components";
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
        <div className="fixed bottom-4 left-0 w-full">
          <Container>
            <CookiesInfoBanner />
          </Container>
        </div>
      </MasterLayout>
    </>
  );
};

export default Market;
