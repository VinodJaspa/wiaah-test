import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { SearchView } from "ui/views";
import MasterLayout from "../../components/MasterLayout";

const Category: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Category</title>
      </Head>
      <MasterLayout>
        <main className="block w-full grow">
          <SearchView></SearchView>
        </main>
      </MasterLayout>
    </>
  );
};

export default Category;
