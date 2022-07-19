import { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { OnMapView, MasterLayout } from "@components";
import { useRouter } from "next/router";
import { Container, SERVICESTYPE_INDEXKEY, useMutateSearchFilters } from "ui";
import { ServicesViewsList } from "@data";
import { ExtractServiceTypeFromQuery } from "utils";

const onmap: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { addFilter } = useMutateSearchFilters();
  const serviceType = ExtractServiceTypeFromQuery(router.query);
  if (ServicesViewsList.findIndex((list) => list.slug === serviceType) > -1) {
    addFilter([SERVICESTYPE_INDEXKEY, serviceType]);
  }
  console.log(router.query);
  return (
    <>
      <Head>
        <title>{t("on map search")}</title>
      </Head>
      <MasterLayout>
        {/* <Container> */}
        <OnMapView />
        {/* </Container> */}
      </MasterLayout>
    </>
  );
};

export default onmap;
