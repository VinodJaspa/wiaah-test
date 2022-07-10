import { NextPage } from "next";
import React from "react";
import { Container } from "ui";
import { ServiceSearchView } from "../../../components";
import MasterLayout from "../../../components/MasterLayout";
import Head from "next/head";
import { useTranslation } from "react-i18next";

const ServiceCategory: NextPage = () => {
  const { t } = useTranslation();
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
          <ServiceSearchView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ServiceCategory;
