import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { SellerLayout } from "ui";
import { dehydrate, QueryClient } from "react-query";
import { useResponsive, PlaceView } from "ui";
import { placesPH } from "ui/placeholder";
import { useRouting } from "routing";

interface PlacesPageProps {}

async function getPlaces() {
  return placesPH;
}

export const getServerSideProps: GetServerSideProps<
  PlacesPageProps
> = async () => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery("places", getPlaces);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const places: NextPage = () => {
  const { isMobile } = useResponsive();
  const { getParam } = useRouting();

  const slug = getParam("slug");

  return (
    <>
      <Head>
        <title>Seller | places</title>
      </Head>
      <SellerLayout header={isMobile ? "minimal" : "main"}>
        <PlaceView slug={slug} />
      </SellerLayout>
    </>
  );
};

export default places;
