import Head from "next/head";
import React from "react";
import { SellerLayout } from "ui";
import { AffiliationView } from "../../components";

const affiliation: React.FC = () => {
  return (
    <>
      <Head>
        <title>Wiaah | affiliation</title>
      </Head>
      <SellerLayout header="main">
        <AffiliationView />
      </SellerLayout>
    </>
  );
};

export default affiliation;
