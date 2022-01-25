import type { NextPage } from "next";
import Head from "next/head";
import { Root, Header, Footer, ImageSlider } from "ui/components";

const Market: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Market</title>
      </Head>
      <Root>
        <Header />
        <main className="flex w-full grow">
          <ImageSlider />
        </main>
        <Footer />
      </Root>
    </>
  );
};

export default Market;
