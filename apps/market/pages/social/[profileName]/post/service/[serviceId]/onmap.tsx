import { MasterLayout, ServicePostOnMapView } from "@components";
import {
  FormatedSearchableFilter,
  getServicePostsOnMapDataFetcher,
  QueryPaginationInputs,
} from "api";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { dehydrate, QueryClient } from "react-query";
import { ServerSideQueryClientProps } from "types";
import { getServicesPostsOnMapQueryKey } from "ui";

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps
> = async (props) => {
  const query = props.query;

  const serviceId = query["id"];
  const queryClient = new QueryClient();
  const filters: FormatedSearchableFilter = { id: serviceId };
  const paginaton: QueryPaginationInputs = { page: 1, take: 20 };
  queryClient.prefetchQuery(
    getServicesPostsOnMapQueryKey(filters, paginaton),
    () => getServicePostsOnMapDataFetcher(filters, paginaton)
  );

  return {
    props: {
      dehydratedProps: dehydrate(queryClient),
    },
  };
};

const ServicePostOnMapPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("Wiaah | service on map")}</title>
      </Head>
      <MasterLayout social>
        <ServicePostOnMapView />
      </MasterLayout>
    </>
  );
};

export default ServicePostOnMapPage;
