import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { Container, SERVICESTYPE_INDEXKEY, useMutateSearchFilters } from "ui";
import { ServicesViewsList } from "../../../../../data";
import { MasterLayout, OnMapView } from "../../../../../components";
import { ExtractServiceTypeFromQuery } from "utils";
import { useRouting } from "routing";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { location } = context.query;

  return {
    props: {
      location: (location as string) || null,
    },
  };
};

const Onmap: NextPage<{ location: string }> = ({ location }) => {
const { t } = useTranslation();
  const router = useRouter();
  const { addFilter } = useMutateSearchFilters();
  const { getParam, getCurrentPath } = useRouting();
  const serviceType = getParam("serviceType");
  const searchLocation = location;

  return (
    <>
      <Head>
        <title>{t("on map search")}</title>
      </Head>
      <MasterLayout>
        <OnMapView searchLocation={searchLocation} />
      </MasterLayout>
    </>
  );
};

export default Onmap;
