import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { ImageSlider } from "ui/components";
import { HomeView } from "ui/views";

const Market: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Market</title>
      </Head>
      <main className="block w-full grow">
        <ImageSlider />
        <HomeView />
      </main>
    </>
  );
};

export default Market;
