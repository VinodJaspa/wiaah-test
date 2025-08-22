import React from "react";
import { MasterLayout } from "@components";
import { ServiceType } from "@features/API";
import { MarketDeatilsView } from "components/MarketSections/DetailsView";
import { NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  BreadCrumb,
  Container
} from "ui";

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
          <MarketDeatilsView
            searchQuery={searchLocation}
            serviceType={serviceType as ServiceType}
          />
        </Container>
      </MasterLayout>
    </>
  );
};

export default Filtered;
