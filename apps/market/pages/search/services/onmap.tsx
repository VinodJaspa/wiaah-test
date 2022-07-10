import { NextPage } from "next";
import React from "react";
import { OnMapView } from "../../../components";
import MasterLayout from "../../../components/MasterLayout";
import Head from "next/head";
import { useTranslation } from "react-i18next";
const onmap: NextPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("on map search")}</title>
      </Head>
      <MasterLayout>
        <OnMapView />
      </MasterLayout>
    </>
  );
};

export default onmap;
