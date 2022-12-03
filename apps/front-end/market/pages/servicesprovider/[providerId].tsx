import { MasterLayout, ServicesProviderView } from "@components";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { QueryClient } from "react-query";
import { Container } from "ui";

interface ServicesProviderProps {
  providerName: string;
}

export const getServerSideProps: GetServerSideProps<
  ServicesProviderProps
> = async ({ query }) => {
  const { providerId } = query;
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({});
  return {
    props: {
      providerName: Array.isArray(providerId)
        ? providerId[0]
        : typeof providerId === "string"
        ? providerId
        : "",
    },
  };
};

const ServiceProvider: NextPage<ServicesProviderProps> = ({ providerName }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>
          {t("services shop")} | {providerName}
        </title>
      </Head>
      <MasterLayout>
        <Container>
          <ServicesProviderView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ServiceProvider;
