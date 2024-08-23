import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";
import { placesPH } from "ui/placeholder";
import Head from "next/head";
import { SellerLayout, useResponsive, LocalisationsView } from "ui";

const getLoclisations = async () => {
  return placesPH;
};

interface LocalisationPageProps { }

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}, // You can add your props here
  };
};

const Localisation: NextPage = () => {
  const { isMobile } = useResponsive();
  return (
    <>
      <Head>
        <title>Buyer | Localisation</title>
      </Head>
      <SellerLayout header={isMobile ? "minimal" : "main"}>
        <LocalisationsView />
      </SellerLayout>
    </>
  );
};

export default Localisation;
