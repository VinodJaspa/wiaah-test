import { NextPage } from "next";
import React from "react";
import { Container, NotFound, useSearchFilters } from "ui";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { MasterLayout } from "../../../../components/MasterLayout";
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
  const { addFilter } = useSearchFilters();
  const router = useRouter();
  const serviceType = ExtractServiceTypeFromQuery(router.query);

  React.useEffect(() => {
    if (typeof serviceType === "string") {
      addFilter([SERVICESTYPE_INDEXKEY, serviceType]);
    }
  }, [serviceType]);
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
