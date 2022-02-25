import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { ImageSlider } from "ui/components";
import { HomeView } from "ui/views";
import MasterLayout from "../components/MasterLayout";

const Market: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Market</title>
      </Head>
      <MasterLayout>
        <main className="block w-full grow">
          <ImageSlider />
          <HomeView />
        </main>
      </MasterLayout>
    </>
  );
};

export default Market;
