import { MasterLayout } from "@components";
import { ServicesViewsList } from "@data";
import { ServiceType } from "@features/API";
import { MarketServiceSearchViewSections } from "components/MarketSections";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Container, MarketServiceSearchView, SERVICESTYPE_INDEXKEY, useMutateSearchFilters } from "ui";
import { ExtractServiceTypeFromQuery } from "utils";

const ServiceCategory: NextPage = () => {
const { t } = useTranslation();
  const router = useRouter();
  const { addFilter } = useMutateSearchFilters();
  const serviceType = ExtractServiceTypeFromQuery(router.query);
  if (ServicesViewsList.findIndex((list) => list.slug === serviceType) > -1) {
    addFilter([SERVICESTYPE_INDEXKEY, serviceType]);
  }
  console.log("MarketServiceSearchView:", MarketServiceSearchView);

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
        <Container className="px-4 md:px-0" >
          <MarketServiceSearchViewSections serviceType={serviceType as ServiceType} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ServiceCategory;
