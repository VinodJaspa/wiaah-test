import { MasterLayout, ShopOnMapSearchView } from "@components";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "ui";

const ShopsOnmapSearch: NextPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("Shops on map search")}</title>
      </Head>
      <MasterLayout>
        <Container>
          <ShopOnMapSearchView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ShopsOnmapSearch;
