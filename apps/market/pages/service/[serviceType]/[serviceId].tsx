import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { ServicesViewsList } from "@data";
import { MasterLayout } from "@components";
import { Container } from "ui";
import {
  ExtractServiceTypeFromQuery,
  getServiceView,
  ServicesTypeSwitcher,
} from "utils";
import { useRouter } from "next/router";

interface ServiceDetailsPageProps {}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  return {
    props: {},
  };
};

const ServiceDetailPage: NextPage<ServiceDetailsPageProps> = () => {
  const router = useRouter();

  const serviceType = ExtractServiceTypeFromQuery(router.query);

  return (
    <>
      <Head>
        <title>Wiaah | Services</title>
      </Head>
      <MasterLayout>
        <Container>
          <ServicesTypeSwitcher
            get={getServiceView.DETAILS}
            servicesList={ServicesViewsList}
            serviceType={serviceType}
          />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ServiceDetailPage;
