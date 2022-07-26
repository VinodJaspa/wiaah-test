import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import {
  ImageSlider,
  Container,
  CookiesInfoBanner,
  AspectRatio,
} from "ui/components";
import { HomeView } from "ui/views";
import MasterLayout from "../components/MasterLayout";

const Market: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Market</title>
      </Head>
      <MasterLayout>
        <AspectRatio ratio={6 / 16}>
          <ImageSlider
            images={["/shop.jpeg", "/shop-2.jpeg", "/shop-3.jpeg"]}
          />
        </AspectRatio>
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
