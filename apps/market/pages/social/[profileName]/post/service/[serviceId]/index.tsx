import { MasterLayout, ServicePostView } from "@components";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { dehydrate, QueryClient } from "react-query";
import { ServerSideQueryClientProps } from "types";
import { Container, getServicePostDetailsQueryKey } from "ui";

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps
> = async (props) => {
  const id = props.query["serviceId"];
  const profileName = props.query["profileName"];
  const queryClient = new QueryClient();
  if (id && profileName) {
    queryClient.prefetchQuery(
      getServicePostDetailsQueryKey({ id, publisher: profileName })
    );
  }
  return {
    props: {
      dehydratedProps: dehydrate(queryClient),
    },
  };
};

const ServicePostPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("Wiaah | service post")}</title>
      </Head>
      <MasterLayout social>
        <Container>
          <ServicePostView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ServicePostPage;
