import { NextPage } from "next";
import React from "react";
import {
  Container,
  NotFound,
  useMutateSearchFilters,
  useSearchFilters,
} from "ui";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { MasterLayout } from "@components";
import { useRouter } from "next/router";
import {
  ExtractServiceTypeFromQuery,
  getServiceView,
  ServicesTypeSwitcher,
} from "utils";
import { ServicesViewsList } from "@data";
import { SERVICESTYPE_INDEXKEY } from "ui";

const ServiceCategory: NextPage = () => {
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
        <title>{t("Service Search")}</title>
      </Head>
      <MasterLayout
        rootProps={{
          scrollable: false,
        }}
      >
        <Container>
          <ServicesTypeSwitcher
            serviceType={serviceType}
            get={getServiceView.SEARCH}
            fallbackComponent={NotFound}
            servicesList={ServicesViewsList}
          />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ServiceCategory;
