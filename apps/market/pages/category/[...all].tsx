import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import {SearchView} from "ui/views";

const Category: NextPage = () => {
  
  return (
    <>
      <Head>
        <title>Wiaah | Category</title>
      </Head>
      <main className="block w-full grow">
        <SearchView></SearchView>
      </main>
    </>
  );
};

export default Category;
