import type { NextPage } from "next";
import Head from "next/head";
import { Root, Header, Footer } from "ui/components";

const Buyer: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Buyer</title>
      </Head>
      <Root>
        <Header />
        <main className="flex w-full p-6 grow"></main>
        <Footer />
      </Root>
    </>
  );
};

export default Buyer;
