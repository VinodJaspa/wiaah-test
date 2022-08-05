import { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { MasterLayout } from "@components";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import {
  ExtractParamFromQuery,
  ExtractServiceTypeFromQuery,
  getServiceView,
  ServicesTypeSwitcher,
} from "utils";
import { ServicesViewsList } from "@data";
import {
  NotFound,
  Container,
  SERVICESTYPE_INDEXKEY,
  useMutateSearchFilters,
  filtersTokens,
  BreadCrumb,
} from "ui";

const filtered: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { addFilter } = useMutateSearchFilters();
  const serviceType = ExtractServiceTypeFromQuery(router.query);
  const searchLocation = ExtractParamFromQuery(router.query, "location");
  if (ServicesViewsList.findIndex((list) => list.slug === serviceType) > -1) {
    addFilter((keys) => [keys.serviceType, serviceType]);
  }
  if (typeof searchLocation === "string") {
    addFilter((keys) => [keys.location, searchLocation]);
  }

  return (
    <>
      <Head>
        <title>
          {t("Service Search")} | {router.query.location || ""}
        </title>
      </Head>
      <MasterLayout>
        <Container className="px-4 py-8">
          <BreadCrumb
            links={router.asPath
              .split("/")
              .filter((link) => link.length > 0)
              .map((link, i) => ({ text: link, url: link }))}
          />
          <ServicesTypeSwitcher
            serviceType={serviceType}
            get={getServiceView.RESAULTS}
            fallbackComponent={NotFound}
            servicesList={ServicesViewsList}
          />
        </Container>
      </MasterLayout>
    </>
  );
};

export default filtered;
