import { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { ServiceFilteredSearchView, MasterLayout } from "@components";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
const filtered: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>
          {t("Service Search")} | {router.query.location || ""}
        </title>
      </Head>
      <MasterLayout>
        <ServiceFilteredSearchView />
      </MasterLayout>
    </>
  );
};

export default filtered;
