import { MasterLayout } from "@components";
import { ShopsSearchView } from "ui";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "ui";

const ShopsSearch: NextPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("Shops Search")}</title>
      </Head>
      <MasterLayout>
        <Container>
          <ShopsSearchView slug="" />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ShopsSearch;
