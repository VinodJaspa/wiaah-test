import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { SellerLayout } from "ui";
import { PlacesView } from "../../components/views/Places";
import { dehydrate, QueryClient } from "react-query";
import { placesPH } from "ui/placeholder";

interface PlacesPageProps {}

async function getPlaces() {
  return placesPH;
}

export const getServerSideProps: GetServerSideProps<PlacesPageProps> =
  async () => {
    const queryClient = new QueryClient();

    queryClient.prefetchQuery("places", getPlaces);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  };

const places: NextPage = () => {
  return (
    <>
      <Head>
        <title>Seller | places</title>
      </Head>
      <SellerLayout>
        <PlacesView />
      </SellerLayout>
    </>
  );
};

export default places;
