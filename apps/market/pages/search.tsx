import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { SearchView } from "ui/views";
import type { AppProps } from "next/app";
import MasterLayout from "../components/MasterLayout";
import { Container } from "ui";
const Search: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Search results</title>
      </Head>
      <MasterLayout>
        <SearchView></SearchView>
      </MasterLayout>
    </>
  );
};

export default Search;
