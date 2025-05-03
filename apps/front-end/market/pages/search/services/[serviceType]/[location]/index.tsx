import { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { MasterLayout } from "@components";
import { useTranslation } from "react-i18next";
import {
  Container,
  BreadCrumb,
  MarketServiceSearchResaultsView,
  MarketServiceSearchView,
} from "ui";
import { ServiceType } from "@features/API";
import { useRouting } from "routing";

const Filtered: NextPage = () => {
const { t } = useTranslation();
  const { getParam, getCurrentPath } = useRouting();
  const serviceType = getParam("serviceType");
  const searchLocation = getParam("location");

  return (
    <>
      <Head>
        <title>
          {t("Service Search")} | {searchLocation || ""}
        </title>
      </Head>
      <MasterLayout>
        <Container className="px-4 py-8">
          <BreadCrumb
            links={getCurrentPath()
              .split("/")
              .filter((link) => link.length > 0)
              .map((link) => ({ text: link, url: link }))}
          />
          <MarketServiceSearchResaultsView
            searchQuery={searchLocation}
            serviceType={serviceType as ServiceType}
          />
        </Container>
      </MasterLayout>
    </>
  );
};

export default Filtered;
