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
        <Header categories={[]} />
        <main className="flex w-full grow p-6"></main>
        <Footer />
      </Root>
    </>
  );
};

export default Buyer;
