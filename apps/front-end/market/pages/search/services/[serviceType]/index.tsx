import { NextPage } from "next";
import React from "react";
import { Container, MarketServiceSearchView, useMutateSearchFilters } from "ui";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { MasterLayout } from "@components";
import { useRouter } from "next/router";
import { ExtractServiceTypeFromQuery } from "utils";
import { ServicesViewsList } from "@data";
import { SERVICESTYPE_INDEXKEY } from "ui";
import { ServiceType } from "@features/API";

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
        <Container className="px-4 py-8">
          <MarketServiceSearchView serviceType={serviceType as ServiceType} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ServiceCategory;
