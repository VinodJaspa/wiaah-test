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

const Onmap: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { addFilter } = useMutateSearchFilters();
  const { getParam, getCurrentPath } = useRouting();
  const serviceType = getParam("serviceType");
  const searchLocation = getParam("location");

  if (ServicesViewsList.findIndex((list) => list.slug === serviceType) > -1) {
    addFilter([SERVICESTYPE_INDEXKEY, serviceType]);
  }

  console.log();

  return (
    <>
      <Head>
        <title>{t("on map search")}</title>
      </Head>
      <MasterLayout>
        {/* <Container> */}
        <OnMapView searchLocation={searchLocation} />
        {/* </Container> */}
      </MasterLayout>
    </>
  );
};

export default Onmap;
