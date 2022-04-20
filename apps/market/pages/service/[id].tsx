import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { ServiceView } from "../../components/Services/ServiceView";
import MasterLayout from "../../components/MasterLayout";
import { Container } from "ui";

interface Service {
  // implement types for service data when the api c
  service: any;
}

const ServiceDetailPage: NextPage<Service> = () => {
  // get product details from api
  return (
    <>
      <Head>
        <title>Wiaah | Services</title>
      </Head>
      <MasterLayout>
        <Container>
          <ServiceView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ServiceDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  // get product details by its id and return it to the page as props
  return {
    props: {},
  };
};
