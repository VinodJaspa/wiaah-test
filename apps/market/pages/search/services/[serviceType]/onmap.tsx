import { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { OnMapView } from "../../../../components";
import MasterLayout from "../../../../components/MasterLayout";
import { useRouter } from "next/router";

const onmap: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  console.log(router.query);
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
