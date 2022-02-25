import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { ProductView } from "ui/views";
import MasterLayout from "../../components/MasterLayout";

const ProductDetailPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Product</title>
      </Head>
      <MasterLayout>
        <main className="block w-full grow">
          <ProductView />
        </main>
      </MasterLayout>
    </>
  );
};

export default ProductDetailPage;
