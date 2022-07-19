import { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { MasterLayout } from "@components";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import {
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
} from "ui";

const filtered: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { addFilter } = useMutateSearchFilters();
  const serviceType = ExtractServiceTypeFromQuery(router.query);
  if (ServicesViewsList.findIndex((list) => list.slug === serviceType) > -1) {
    addFilter([SERVICESTYPE_INDEXKEY, serviceType]);
  }
  return (
    <>
      <Head>
        <title>
          {t("Service Search")} | {router.query.location || ""}
        </title>
      </Head>
      <MasterLayout>
        <Container>
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
