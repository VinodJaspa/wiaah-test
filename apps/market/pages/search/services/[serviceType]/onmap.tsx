import { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { OnMapView, MasterLayout } from "@components";
import { useRouter } from "next/router";
import { Container } from "ui";

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
        {/* <Container> */}
        <OnMapView />
        {/* </Container> */}
      </MasterLayout>
    </>
  );
};

export default onmap;
