import { NextPage } from "next";
import React from "react";
import { Container, NotFound } from "ui";
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

const ServiceCategory: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const serviceType = ExtractServiceTypeFromQuery(router.query);
  React.useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setLoaded(true);
    });
  }, []);
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
