import { MasterLayout } from "@components";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { Container, SearchView } from "ui";

const ShopsLocationSearch: NextPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("Shop search results")}</title>
      </Head>
      <MasterLayout>
        <Container>
          <SearchView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ShopsLocationSearch;
