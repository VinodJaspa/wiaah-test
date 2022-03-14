import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { SearchView } from "ui/views";
import type { AppProps } from "next/app";
import MasterLayout from "../components/MasterLayout";
const Search: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Search results</title>
      </Head>
      <MasterLayout>
        <main className="block w-full grow">
          <SearchView></SearchView>
        </main>
      </MasterLayout>
    </>
  );
};

export default Search;
