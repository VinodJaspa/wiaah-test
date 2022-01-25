import type { NextPage } from "next";
import Head from "next/head";
import { Root, Header, Footer, ImageSlider } from "ui/components";
import { HomeView } from "ui/views";

const Market: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Market</title>
      </Head>
      <Root>
        <Header />
        <main className="block space-y-4 w-full grow">
          <ImageSlider />
          <HomeView />
        </main>
        <Footer />
      </Root>
    </>
  );
};

export default Market;
