import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { ServiceView } from "ui";
import MasterLayout from "../../components/MasterLayout";
import { Container } from "ui";

interface Service {}

const ServiceDetailPage: NextPage<Service> = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Services</title>
      </Head>
      <MasterLayout>
        <Container>
          <ServiceView serviceId="1" />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ServiceDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  return {
    props: {},
  };
};
