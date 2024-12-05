import { MasterLayout, ShopOnMapSearchView } from "@components";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "ui";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { location } = context.query;

  return {
    props: {
      location: location || null,
    },
  };
};

const ShopsOnmapSearch: NextPage<{ location: string }> = ({ location }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("Shops on map search")}</title>
      </Head>
      <MasterLayout>
        <ShopOnMapSearchView location={location} />
      </MasterLayout>
    </>
  );
};

export default ShopsOnmapSearch;
