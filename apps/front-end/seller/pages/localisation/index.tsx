import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";
import { placesPH } from "ui/placeholder";
import Head from "next/head";
import { SellerLayout, useResponsive } from "ui";
import { LocalisationsView } from "ui";

const getLoclisations = async () => {
  return placesPH;
};

interface LocalisationPageProps { }

export const getServerSideProps: GetServerSideProps<
  LocalisationPageProps
> = async () => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery("localisations", getLoclisations);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Localisation: NextPage = () => {
  const { isMobile } = useResponsive();
  return (
    <>
      <Head>
        <title>Seller | Localisation</title>
      </Head>
      <SellerLayout header={isMobile ? "minimal" : "main"}>
        <LocalisationsView />
      </SellerLayout>
    </>
  );
};

export default Localisation;
