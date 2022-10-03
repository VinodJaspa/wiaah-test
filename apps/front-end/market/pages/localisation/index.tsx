import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Container } from "ui";
import MasterLayout from "../../components/MasterLayout";
import { LocalisationView } from "../../components/Localisation/LocalisationView";
interface LocalisationProps {}

export const getServerSideProps: GetServerSideProps<LocalisationProps> =
  async () => {
    // prefetch localisations and pass it to react query as
    // hyderated props

    return {
      props: {},
    };
  };

const localisation: NextPage<LocalisationProps> = () => {
  return (
    <>
      <Head>
        <title>Wiaah | places</title>
      </Head>
      <MasterLayout social>
        <Container>
          <LocalisationView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default localisation;
