import React from "react";
import { NextPage, GetServerSideProps } from "next";
import { Container, PlaceCardProps } from "ui";
import MasterLayout from "../../components/MasterLayout";
import Head from "next/head";
import { PlacesView } from "../../components/Places/PlacesView";

export interface PlacesPageProps {
  places: PlaceCardProps[];
}

const places: NextPage<PlacesPageProps> = ({ places }) => {
  return (
    <>
      <Head>
        <title>Wiaah | places</title>
      </Head>
      <MasterLayout social>
        <Container>
          <PlacesView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default places;

export const getServerSideProps: GetServerSideProps<PlacesPageProps> =
  async () => {
    // get places server side and pass it with react query
    // hyderation

    const places = [];

    return {
      props: {
        places,
      },
    };
  };
